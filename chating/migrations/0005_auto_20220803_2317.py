# Generated by Django 3.1.5 on 2022-08-03 22:17

import datetime
from django.conf import settings
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chating', '0004_auto_20220803_2233'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='users',
            field=models.ManyToManyField(related_name='rooms', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 3, 22, 17, 34, 110175, tzinfo=utc)),
        ),
    ]
