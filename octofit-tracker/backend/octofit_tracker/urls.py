"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, TeamViewSet, WorkoutViewSet, ActivityViewSet, LeaderboardViewSet
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework.response import Response
from rest_framework.decorators import api_view

CODESPACE_NAME = os.environ.get('CODESPACE_NAME')


def get_api_base_url(request):
    if CODESPACE_NAME:
        return f"https://{CODESPACE_NAME}-8000.app.github.dev/api/"
    # fallback to current host
    return request.build_absolute_uri('/api/')

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'leaderboard', LeaderboardViewSet)

@api_view(['GET'])
def api_root(request, format=None):
    base = get_api_base_url(request)
    return Response({
        'users': f"{base}users/",
        'teams': f"{base}teams/",
        'workouts': f"{base}workouts/",
        'activities': f"{base}activities/",
        'leaderboard': f"{base}leaderboard/",
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_root, name='api-root'),
    path('docs/', include_docs_urls(title='Octofit Tracker API')),
    path('schema/', get_schema_view(title='Octofit Tracker API', description='API for all endpoints', version='1.0.0'), name='openapi-schema'),
]
