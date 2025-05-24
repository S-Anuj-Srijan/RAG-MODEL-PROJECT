import fitz  # PyMuPDF
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct
import requests
import uuid
from fastapi import HTTPException

# Qdrant setup
QDRANT_URL = "https://bb82157b-f0d9-464a-a712-93dd4376bb67.us-west-1-0.aws.cloud.qdrant.io:6333"
QDRANT_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.Gxs1gkkFwokSV5HSNJopCUlXSt0dw9HGm6meyKpAfCY"
COLLECTION_NAME = "rag_chunks"

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

# Jina AI embedding setup
JINA_API_KEY = "jina_9c64c27be1274af3982016fc724b1e8cxED4wo6RsbfrFm5vUmaYJKWIbwR3"

def embed(text: str) -> list[float]:
    try:
        response = requests.post(
            "https://api.jina.ai/v1/embeddings",
            headers={"Authorization": f"Bearer {JINA_API_KEY}"},
            json={"input": text, "model": "jina-embeddings-v2-base-en"},
        )
        response.raise_for_status()
        return response.json()["data"][0]["embedding"]
    except Exception as e:
        print("❌ Jina embedding error:", e)
        raise HTTPException(status_code=500, detail="Failed to generate embeddings with Jina.")

# PDF upload processing
async def process_pdf_and_store(pdf_file):
    try:
        pdf_bytes = await pdf_file.read()
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")

        vectors = []
        for i, page in enumerate(doc):
            text = page.get_text()
            print(f"📄 Page {i+1} text preview:", text[:100])

            if text.strip():
                vector = embed(text[:2000])
                vectors.append(PointStruct(
                    id=str(uuid.uuid4()),
                    vector=vector,
                    payload={"text": text, "page": i + 1}
                ))

        if not vectors:
            print("⚠️ No valid text found in PDF.")
            return

        collections = [c.name for c in client.get_collections().collections]
        if COLLECTION_NAME not in collections:
            client.create_collection(
                COLLECTION_NAME,
                vectors_config=VectorParams(
                    size=len(vectors[0].vector),
                    distance=Distance.COSINE
                )
            )

        client.upsert(collection_name=COLLECTION_NAME, points=vectors)
        print("✅ Upload and storage complete.")

    except Exception as e:
        print("❌ Exception during PDF processing:", e)
        raise HTTPException(status_code=500, detail="Internal server error during PDF processing.")

# Dummy generate_answer (until GPT or OpenRouter is added)
async def generate_answer(query: str, architectures: list[str]):
    # Since GPT is removed, we'll return mock results for now
    return {
        arch: {
            "answer": "Answer generation temporarily disabled (no LLM configured).",
            "context": "Context retrieved from vector store.",
            "timeTaken": 1000,
            "pageNumber": 1,
            "score": 0.0
        }
        for arch in architectures
    }
