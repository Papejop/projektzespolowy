from django.db import models
from pgvector.django import VectorField
from tracks.utils import generate_vibe_embedding

class Track(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    album = models.CharField(max_length=255, blank=True, null=True)
    genre = models.CharField(max_length=100, blank=True, null=True)
    
    vibe_description = models.TextField(blank=True, null=True)
    embedding = VectorField(dimensions=384, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Auto-generate a default vibe description if none was provided
        if not self.vibe_description:
            genre_str = f" in {self.genre} genre" if self.genre else ""
            album_str = f" from the album {self.album}" if self.album else ""
            self.vibe_description = f"A song titled {self.title} by {self.artist}{album_str}{genre_str}."

        # Auto-generate vector embedding if it's new or description changed
        if not self.embedding or self._state.adding:
            self.embedding = generate_vibe_embedding(self.vibe_description)
                
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} - {self.artist}"