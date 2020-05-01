from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse


# Create your views here.
from django.template import loader

from .models import Question

from rest_framework import serializers, viewsets, routers


def questions(request):
    return HttpResponse("Welcome to QUESTIONS")


def index(request):
    newest = Question.objects.order_by("-created_at")[:10]
    return render(request, "ask/index.html", {"latest_question_list": newest})


def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'ask/detail.html', {'question': question})


# ---------------------------------

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

rest_list_router = routers.DefaultRouter()
rest_list_router.register('question', QuestionViewSet)

