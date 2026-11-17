import os
from pydub import AudioSegment
from mutagen.easyid3 import EasyID3
from mutagen.mp3 import MP3

# Create target directory for mock music
output_dir = "mock_music_library"
os.makedirs(output_dir, exist_ok=True)

print("Generating a base audio file...")
# Generate a short 1-second silent audio file
silent_audio = AudioSegment.silent(duration=1000)
base_path = os.path.join(output_dir, "base.mp3")
silent_audio.export(base_path, format="mp3")

artists = ["The Synthetics", "Neural Network", "Vector Jam", "Lo-Fi Gradient", "Binary Beats"]
genres = ["Electronic", "Ambient", "Synthwave", "Chillhop", "Experimental"]

print("Generating 1,000 MP3 files with ID3 metadata...")
for i in range(1, 1001):
    file_name = f"track_{i:04d}.mp3"
    file_path = os.path.join(output_dir, file_name)
    
    # Copy base silent mp3
    silent_audio.export(file_path, format="mp3")
    
    # Inject ID3 tags using Mutagen
    try:
        audio = MP3(file_path, ID3=EasyID3)
    except Exception:
        audio = MP3(file_path)
        audio.add_tags()
        audio = EasyID3(file_path)
        
    audio['title'] = f"Test Song Number {i}"
    audio['artist'] = artists[i % len(artists)]
    audio['album'] = f"Generation Batch {i % 20}"
    audio['genre'] = genres[i % len(genres)]
    audio.save()

print(f"Successfully generated 1,000 mock MP3 files in '{output_dir}/'!")