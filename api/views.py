from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from app.models import Task, State, User
import json

# API para peticiones al servidor de la BD

@api_view(['GET'])
@login_required
def get_tasks(request, user_id):
    if request.method == "GET":
        # Obtener todas las tareas de la base de datos
        tasks = Task.objects.filter(id_user=user_id).values('id', 'name', 'description', 'start_date', 'end_date', 'state__name')
        tasks_list = list(tasks)  # Convertir QuerySet a lista
        return JsonResponse(tasks_list, safe=False)

@api_view(['GET'])
@login_required
def get_task(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)

        task_data = {
            'id': task.id,
            'name': task.name,
            'description': task.description,
            'start_date': task.start_date,
            'end_date': task.end_date,
            'state': task.state.name,
            'id_user': task.id_user.id,

        }
        return JsonResponse(task_data, safe=False)
    
    except Task.DoesNotExist:
        return JsonResponse({'error': 'Task not found'}, status=404)





@api_view(['POST'])
@login_required   
def post_task(request):
    if request.method == "POST":
        try:
            data = request.data
            
            # Obtener el estado por nombre (scheduled, to finish, etc.)
            state_name = data.get('state', 'scheduled')
            state = State.objects.get(name=state_name)
            print(data)
            # Crear la nueva tarea
            task = Task.objects.create(
                name=data['name'],
                description=data['description'],
                start_date=data['start-date'],
                end_date=data['end-date'],
                state=state,
                id_user=request.user  
            )
            return JsonResponse({"message": "Task created successfully", "task_id": task.id}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


@api_view(['PUT'])
@login_required
def update_task(request, task_id):
    if request.method == "PUT":
        try:
            data = request.data
            task = Task.objects.get(id=task_id)

            # Actualizar campos de la tarea
            task.name = data.get('name', task.name)
            task.description = data.get('description', task.description)
            task.start_date = data.get('start_date', task.start_date)
            task.end_date = data.get('end_date', task.end_date)

            # Actualizar estado si se proporciona
            if 'state' in data:
                state_name = data.get('state', task.state.name)
                state = State.objects.get(name=state_name)
                task.state = state

            task.save()

            return JsonResponse({"message": "Task updated successfully"}, status=200)
        except Task.DoesNotExist:
            return JsonResponse({"error": "Task not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


@api_view(['DELETE'])
@login_required
def delete_task(request, task_id):
    if request.method == "DELETE":
        try:
            task = Task.objects.get(id=task_id)
            task.delete()
            return JsonResponse({"message": "Task deleted successfully"}, status=200)
        except Task.DoesNotExist:
            return JsonResponse({"error": "Task not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
