from django.shortcuts import render

from .models import Question


# Create your views here.

def index(request):
    total = len(Question.objects.order_by())
    return render(request, "ask/index.html", {"amount": total})
