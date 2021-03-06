# Generated by Django 3.2.8 on 2021-12-20 06:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=30)),
                ('highlighted', models.TextField(default='highlight')),
                ('owner', models.ForeignKey(default='user', on_delete=django.db.models.deletion.CASCADE, related_name='products', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='NutrientsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vitamin', models.CharField(max_length=5)),
                ('acid', models.CharField(max_length=40)),
                ('base', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='nutrients', to='app.productsmodel')),
            ],
        ),
    ]
