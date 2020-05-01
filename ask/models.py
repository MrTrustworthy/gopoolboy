from django.db import models
from django.utils import timezone
import datetime


# Create your models here.

class Question(models.Model):
    title = models.CharField(max_length=200)
    text = models.CharField(max_length=8000)
    created_at = models.DateTimeField("date created")

    def is_recent(self):
        return self.created_at >= timezone.now() - datetime.timedelta(days=3)


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=5000)
    votes = models.IntegerField(default=0)
    created_at = models.DateTimeField("date created")

    def is_recent(self):
        return self.created_at >= timezone.now() - datetime.timedelta(days=3)
