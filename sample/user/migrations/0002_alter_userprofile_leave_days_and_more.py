# Generated by Django 4.0 on 2022-01-03 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='leave_days',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], default='-', max_length=20),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='manager_name',
            field=models.CharField(choices=[('Yasin', 'Yasin')], default='-', max_length=50),
        ),
    ]
