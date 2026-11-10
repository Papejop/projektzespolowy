# MusicSearch RAG (POC Edition) — Project Specification
readme version 2

## 1. Product Vision

**MusicSearch RAG** is a locally hosted web application for indexing a personal music library and discovering tracks using natural language semantic search. By using PostgreSQL with `pgvector` alongside a local embedding engine, users can query their music collection based on lyrical themes, moods, and contextual concepts.

**Problem:** Standard local file search requires knowing exact file names, titles, or tags. Searching by mood, vague memory, or lyrical concept ("find songs about driving through the desert at night") is impossible with regular file managers.

**Vision Statement:**
> For people who want to find specific tracks by vibe, topic, or context, MusicSearch RAG is a local semantic discovery tool that turns natural language queries into song matches.

---

## 2. Value Proposition

| Who | Problem | What We Offer |
|---|---|---|
| User | Can't remember song titles, only lyrics, themes, or vibes | Semantic natural language search across track metadata and lyrics |
| Privacy-Minded User | Cloud AI services require uploading private data or paying subscription fees | 100% offline, local search running on your own hardware via `pgvector` |

**Unique Value Proposition (UVP):** A local search engine that lets you search your local music library by concept and context rather than exact title keywords.

---

## 3. Business & System Requirements

- **BR-01** Execute semantic audio/lyric queries and return matching song results.
- **BR-02** Allow users to select and index a local music directory, extracting ID3 tags and lyrics.
- **BR-03** Run fully self-hosted locally without external API dependencies or accounts.
- **BR-04** Zero cost: run using local GPU resources.

---

## 4. User Stories

Priorities: **M** = Must (MVP), **S** = Should, **C** = Could.

| ID | User Story | Priority |
|---|---|---|
| US-01 | As a user, I want to index a local directory of audio files so that track metadata and lyrics are stored in the database. | M |
| US-02 | As a user, I want to perform semantic searches (e.g., "songs about rain and heartbreak") so that I can discover relevant tracks. | M |
| US-03 | As a user, I want the system to explain *why* a track matched my semantic query. | C |
| US-04 | As a user, I want to click a track result to copy its file path to my clipboard so I can open/use it in my system. | S |
| US-05 | As a user, I want to filter semantic search results by traditional criteria (e.g., specific Genre or Release Year). | S |

---

## 5. MVP Scope

The MVP is strictly focused on **Indexing + Vector Search + Displaying Matches**:
1. Scan local folder and insert tracks into PostgreSQL.
2. Generate vector embeddings for lyrics and metadata (with automatic metadata fallbacks for instrumental/lyricless tracks).
3. Accept natural language queries in React, perform cosine distance search via `pgvector`, and display top matching tracks with file paths and match justifications.

---

## 6. Backlog & Development Tasks

| ID | Task | User Story | Stage |
|---|---|---|---|
| T-01 | Choosing the project idea, defining scope, writing initial specification | — | 1 |
| T-02 | Setting up repository, Django backend skeleton, React + Vite frontend, PostgreSQL + `pgvector` Docker container | — | 1 |
| T-03 | File Scanner service: Read local MP3/FLAC metadata (`mutagen`) & lyrics | US-01 | 2 |
| T-04 | Vector embedding pipeline (`sentence-transformers` / local models) | US-02 | 2 |
| T-05 | RAG retrieval endpoint in Django using `pgvector` | US-02, US-03 | 3 |
| T-06 | React Search UI: Query bar, match list display | US-02, US-04 | 3 |
| T-07 | Performance testing & verification with a ~1,000 song local library | — | 4 |

---

## 7. Non-Functional Requirements

- **NFR-01 Local Performance:** Fast vector similarity search across up to 1,000 tracks running on local hardware.
- **NFR-02 Security (Single-User Local):** Application binds to `localhost` / `127.0.0.1` only. Authentication and multi-user isolation are intentionally omitted for the single-user POC.
- **NFR-03 Easy Startup:** Run backend/database via Docker Compose and launch frontend via Vite (`npm run dev`).
- **NFR-04 Desktop Target:** Optimized for desktop web browsers (Chrome, Firefox).

---

## 8. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React (Vite) + Tailwind CSS | Single-page search dashboard built for desktop viewports |
| **Backend** | Python / Django + DRF | Handles directory scanning, API requests, and database queries |
| **Database** | PostgreSQL + `pgvector` | Native vector storage for embeddings and track metadata |
| **Embeddings** | `sentence-transformers` (`all-MiniLM-L6-v2`) | Lightweight Python embedding model running locally on CPU/GPU |
| **LLM** | Ollama (subject to change) (Llama 3 / Qwen ) |
| **Metadata** | `mutagen` | Python library for reading ID3/audio tags and lyrics |

---

## 9. Data Model & Fallback Strategy

### Models (subject to change)
- **Track**: `id`, `title`, `artist`, `album`, `genre`, `year`, `file_path`, `lyrics_text` (nullable), `created_at`
- **TrackEmbedding**: `id`, `track_id` (FK), `content_chunk`, `embedding_vector` (`vector(384)`), `chunk_type` (`lyric_plus_meta` or `meta_only`)

### Missing Lyrics Handling
For instrumental tracks or songs lacking ID3 lyric tags, the ingestion pipeline generates a fallback search text combining `Title`, `Artist`, `Album`, `Genre`, and `Year`. This ensures all songs generate valid 384-dimensional vector embeddings and remain searchable by style, genre, or mood context.

---
