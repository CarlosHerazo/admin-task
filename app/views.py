from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect
# Create your views here.

def login(request):
    return render(request,'registration/login.html')

@login_required
def index(request):
    return render(request,'index.html')


def logout_view(request):
    logout(request)
    return redirect('login')
    