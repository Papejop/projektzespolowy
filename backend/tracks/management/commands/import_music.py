from pathlib import Path
from django.core.management.base import BaseCommand
from mutagen.easyid3 import EasyID3
from tracks.models import Track

class Command(BaseCommand):
    help = 'Scans a folder for MP3 files, reads ID3 tags, and imports them into the database.'

    def add_arguments(self, parser):
        parser.add_argument('folder_path', type=str, help='Path to the folder containing MP3 files')

    def handle(self, *args, **options):
        folder_path = Path(options['folder_path'])
        
        if not folder_path.exists():
            self.stdout.write(self.style.ERROR(f"Directory {folder_path} does not exist!"))
            return

        mp3_files = list(folder_path.glob('**/*.mp3'))
        self.stdout.write(f"Found {len(mp3_files)} MP3 files. Starting import...")

        for file_path in mp3_files:
            try:
                audio = EasyID3(file_path)
                title = audio.get('title', [file_path.stem])[0]
                artist = audio.get('artist', ['Unknown Artist'])[0]
                album = audio.get('album', [None])[0]
                genre = audio.get('genre', [None])[0]

                track, created = Track.objects.get_or_create(
                    title=title,
                    artist=artist,
                    defaults={'album': album, 'genre': genre}
                )
                
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Imported: {track}"))
                else:
                    self.stdout.write(f"Skipped (already exists): {track}")
            except Exception as e:
                self.stdout.write(self.style.WARNING(f"Could not read tags for {file_path.name}: {e}"))