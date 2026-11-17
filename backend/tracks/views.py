from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from pgvector.django import CosineDistance
from tracks.models import Track
from tracks.serializers import TrackSerializer
from tracks.utils import generate_vibe_embedding

class VibeSearchAPIView(APIView):
    def get(self, request):
        query_text = request.query_params.get('q', '')
        
        if not query_text:
            return Response(
                {"error": "Please provide a search query using the 'q' parameter."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        query_vector = generate_vibe_embedding(query_text)
        
        results = Track.objects.annotate(
            distance=CosineDistance('embedding', query_vector)
        ).order_by('distance')[:10]
        
        serializer = TrackSerializer(results, many=True)
        
        return Response({
            "query": query_text,
            "results": serializer.data
        }, status=status.HTTP_200_OK)