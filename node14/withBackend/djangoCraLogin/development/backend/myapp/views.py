import uuid
import random
import decimal
import json
import traceback
from time import sleep
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from .models import Person

@require_http_methods(["POST"])
@csrf_exempt
def dosignin(request):
    try:
        body = json.loads(request.body)
        user = authenticate(
            username=body["account"], 
            password=body["password"])
        if not user:
            return HttpResponse(status=404)

        login(request, user)
        return HttpResponse(status=200)
    except:
        print(traceback.format_exc())
        return HttpResponse(status=500)

@require_http_methods(["POST"])
def signout(request):
    try:
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        logout(request)
        return HttpResponse(status=200)
    except:
        print(traceback.format_exc())
        return HttpResponse(status=500)

@require_http_methods(["POST"])
def insert(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    for i in range(random.randint(10, 50)):
        sleep(decimal.Decimal(random.randrange(50, 300))/1000)

        p = Person(
            fname=uuid.uuid4().hex[:16], 
            lname=uuid.uuid4().hex[:16], 
            age=random.randint(10, 60))
        p.save()

    return JsonResponse({"result": "created!"})

@require_http_methods(["GET"])
def show1(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM person_info;")
        data = cursor.fetchall()

    output = ""
    for p in data:
      output += str(p[0]) + " " + p[1] + " " + p[2] + "<br>"

    return JsonResponse({"result": output})

@require_http_methods(["GET"])
def show2(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    with connection.cursor() as cursor:
        # `person_info` is view, callproc does not work
        # cursor.callproc("person_info")
        cursor.callproc("my_func") 
        data = cursor.fetchall()

    output = ""
    for p in data:
        output += str(p[0]) + " " + p[1] + " " + p[2] + "<br>"

    return JsonResponse({"result": output})
