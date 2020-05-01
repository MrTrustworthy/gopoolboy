from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

from . import schema
from . import views

app_name = "ask"
urlpatterns = [
    path('', views.index, name='index'),
    path('graphiql', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema.schema))),
    path('graphql', csrf_exempt(GraphQLView.as_view(schema=schema.schema))),
]
