# Generated by Django 3.2.16 on 2022-10-18 10:22

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('chating', '0007_alter_message_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 10, 18, 10, 22, 17, 678651, tzinfo=utc)),
        ),
    ]
