# Generated by Django 4.2.2 on 2023-07-02 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vaga_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vaga',
            name='candidatos',
            field=models.ManyToManyField(blank=True, to='vaga_api.candidato'),
        ),
    ]
