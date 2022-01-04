# Generated by Django 4.0 on 2021-12-24 11:28

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='LeaveRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leave_reason', models.CharField(max_length=100)),
                ('leave_type', models.CharField(choices=[('Personal leave', 'Personal Leave'), ('Carry forward', 'Carry Forward'), ('Compensatory leave', 'Compensatory Leave')], max_length=20)),
                ('from_date', models.DateTimeField(default=datetime.datetime.now)),
                ('to_date', models.DateTimeField(default=datetime.datetime.now)),
                ('no_of_days', models.IntegerField()),
                ('cancel_reason', models.CharField(max_length=100)),
                ('manager_name', models.CharField(max_length=50)),
                ('status', models.CharField(default='requested', max_length=100)),
                ('emp_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth.user')),
            ],
        ),
    ]