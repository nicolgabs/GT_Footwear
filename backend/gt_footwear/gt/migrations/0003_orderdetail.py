# Generated by Django 5.0.4 on 2024-05-20 10:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gt', '0002_delete_orderdetail'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('customer_first_name', models.CharField(max_length=100)),
                ('customer_last_name', models.CharField(max_length=100)),
                ('customer_email', models.EmailField(max_length=254)),
                ('customer_address', models.CharField(max_length=255)),
                ('customer_phone', models.CharField(max_length=20)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gt.order')),
                ('size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gt.size')),
            ],
        ),
    ]