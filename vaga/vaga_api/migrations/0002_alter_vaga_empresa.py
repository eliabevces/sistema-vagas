# Generated by Django 4.2.2 on 2023-07-04 03:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vaga_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vaga',
            name='empresa',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='empresa', to='vaga_api.empresa'),
        ),
    ]