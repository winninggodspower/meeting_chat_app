# chat/consumers.py
from email import message
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Message

class ChatConsumer(WebsocketConsumer):
    def fetch_messages(self, data):
        messages = Message().last_10_messages()
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages),
        }

        self.send_message(content)
    
    def messages_to_json(self, messages):
        return [self.message_to_json(message) for message in messages]

    def message_to_json(self, message):
        return {'author': message.author.username,
                'user_img_url': message.author.userprofile.user_img.url,
                'content': message.content,
                'votes': message.votes,
                'timestamp': str(message.timestamp),
                'reply': str(message.reply),
                'to': str(message.to),
                'message_id': str(message.id)
                }

    def new_messages(self, data):
        author = self.user 
        content = data['message']
        reply = True if data['reply'] == 'true' else False
        # getting the 'to' keyword if it was a reply else setting the 'to' to None 
        if reply:
            to = data['to']
        else:
            to = None
            
        message = Message.objects.create(author = author, content = content, reply = reply, to = to)
        message.save()

        content = {
            'command': 'new_message', 
            'message': self.message_to_json(message),
        }

        return self.send_chat_message(content)
        
    
    command = {
        'fetch_messages': fetch_messages,
        'new_messages': new_messages,
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        self.user = self.scope["user"] # getting the user

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name  
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.command[data['command']](self, data)

    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
            }
        )
    
    def send_message(self, message):
        self.send(text_data=json.dumps(message))
    
    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
