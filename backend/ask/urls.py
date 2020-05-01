from . import schema
from django.urls import path, include
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from . import views

app_name = "ask"
urlpatterns = [
    path('', views.index, name='index'),
    path('q/<int:question_id>/', views.detail, name='detail'),
    path('questions', views.questions, name='questions'),
    path('api/', include(views.rest_list_router.urls)),
    path('rest', TemplateView.as_view(template_name="rest_list.html")),
    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))) #, schema=schema.graph_schema)))
]

