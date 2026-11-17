from sentence_transformers import SentenceTransformer

# Loads 'all-MiniLM-L6-v2' (384 dimensions, CPU-optimized)
model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_vibe_embedding(text: str) -> list[float]:
    """Converts any text description into a 384-dimensional vector."""
    if not text:
        return []
    embedding = model.encode(text)
    return embedding.tolist()