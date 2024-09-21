from django.urls import path
from . import views

urlpatterns = [
    path('tasks/read/<int:user_id>', views.get_tasks, name='get_tasks'),
    path('tasks/create/', views.post_task, name='post_task'),
    path('tasks/update/<int:task_id>/', views.update_task, name='update_task'),
    path('tasks/delete/<int:task_id>/', views.delete_task, name='delete_task'),
]