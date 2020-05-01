from django.urls import path, include
from django.views.generic import TemplateView

from . import views

app_name = "ask"
urlpatterns = [
    path('', views.index, name='index'),
    path('q/<int:question_id>/', views.detail, name='detail'),
    path('questions', views.questions, name='questions'),
    path('api/', include(views.rest_list_router.urls)),
    path('rest', TemplateView.as_view(template_name="rest_list.html"))
]

