import graphene
from graphene_django.types import DjangoObjectType
from .models import Question, Answer


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question


class AnswerType(DjangoObjectType):
    class Meta:
        model = Answer


class Query(graphene.ObjectType):
    question = graphene.Field(QuestionType, id=graphene.Int(), title=graphene.String())
    all_questions = graphene.List(QuestionType)
    all_answers = graphene.List(AnswerType)

    def resolve_all_questions(self, info, **kwargs):
        return Question.objects.all()

    def resolve_question(self, info, **kwargs):
        id = kwargs.get('id')
        title = kwargs.get('title')

        if id is not None:
            return Question.objects.get(pk=id)

        if title is not None:
            return Question.objects.get(title=title)

        return None

    def resolve_all_answers(self, info, **kwargs):
        return Answer.objects.all()


schema = graphene.Schema(query=Query)
