from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    state = models.ForeignKey('State', on_delete=models.CASCADE)
    id_user = models.ForeignKey(User,  on_delete=models.CASCADE)

    class Meta:
        db_table = 'tareas'


class State(models.Model):
    name = models.CharField(
        max_length=50,
        choices=[
            ('scheduled', 'Scheduled'),
            ('to finish', 'To finish'),
            ('compliment', 'Compliment'),
            ('expired', 'Expired')
        ],
        default='scheduled'
    )

    class Meta:
        db_table = 'state'
    
    
    def __str__(self):
        return self.name
