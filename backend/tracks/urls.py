from django.urls import path
from tracks.views import VibeSearchAPIView

urlpatterns = [
    path('search/', VibeSearchAPIView.as_view(), name='vibe-search'),
]