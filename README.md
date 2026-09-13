# RepoLens

AI-powered tool for understanding unfamiliar GitHub repositories through semantic code search and grounded LLM answers.

## What it does

RepoLens takes a **public GitHub repository URL**, analyzes its source code, and lets you ask questions about the codebase.

```text
GitHub URL
   ↓
Clone Repository
   ↓
Scan + Chunk Code
   ↓
Gemini Embeddings
   ↓
Pinecone
   ↓
User Question
   ↓
Semantic Retrieval
   ↓
GPT-OSS 120B
   ↓
Answer + Sources
```

## Features

- Analyze public GitHub repositories
- Automatically scan supported source files
- Chunk code into overlapping sections
- Generate embeddings using Gemini Embedding 2
- Store code vectors in Pinecone
- Retrieve relevant code using semantic search
- Generate grounded answers using GPT-OSS 120B
- Show source files used for the answer
- Separate repositories using Pinecone namespaces

## Tech Stack

**Frontend**
- React
- Vite
- CSS

**Backend**
- Node.js
- Express.js
- JavaScript (ES Modules)
- Simple Git

**AI / Vector Search**
- Google Gemini Embedding 2
- Pinecone
- Groq
- OpenAI GPT-OSS 120B

## Project Structure

```text
RepoLens/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── temp/
│   ├── app.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── App.jsx
        └── App.css
```

The main backend services handle repository cloning, scanning, chunking, embeddings, Pinecone storage/retrieval, and AI response generation.

## RAG Pipeline

### Indexing

```text
Repository → Files → Code Chunks → Embeddings → Pinecone
```

Current chunking uses **100 lines per chunk with 20 lines overlap**, and embeddings are stored as **768-dimensional vectors**.

### Question Answering

```text
Question → Query Embedding → Pinecone Search
         → Relevant Code Chunks → LLM → Answer
```

The LLM is instructed to use only the retrieved repository context and avoid inventing implementation details.

## Setup

### 1. Clone

```bash
git clone https://github.com/<your-username>/RepoLens.git
cd RepoLens
```

### 2. Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
GEMINI_API_KEY=your_key
PINECONE_API_KEY=your_key
PINECONE_INDEX=repolens
GROQ_API_KEY=your_key
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Example Questions

```text
Where is user authentication implemented?

How does document ingestion work?

Where are API routes defined?

How is data stored in the database?

Which files handle repository scanning?
```

## Limitations

- Public GitHub repositories only
- Large repositories may take longer to analyze
- No incremental indexing yet
- No authentication or saved projects yet
- Source viewing is currently limited to retrieved file information

## Future Ideas

- Repository/project overview
- AI-powered repository investigation
- Code preview for retrieved chunks
- Incremental indexing
- Better repository identifiers
- Multi-step agentic investigation

## Author

**Gaurav Joshi**

In Love with making Cool Projects ,bye.
