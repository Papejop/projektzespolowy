from rest_framework import serializers
from tracks.models import Track

class TrackSerializer(serializers.ModelSerializer):
    similarity_score = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = [
            'id', 
            'title', 
            'artist', 
            'album', 
            'genre', 
            'vibe_description', 
            'similarity_score'
        ]

    def get_similarity_score(self, obj):
        if hasattr(obj, 'distance') and obj.distance is not None:
            return round(1 - float(obj.distance), 4)
        return None