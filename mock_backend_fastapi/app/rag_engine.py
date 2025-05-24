import fitz  # PyMuPDF
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct
import openai
import uuid

# === Qdrant Setup ===
QDRANT_URL = "https://bb82157b-f0d9-464a-a712-93dd4376bb67.us-west-1-0.aws.cloud.qdrant.io:6333"
QDRANT_API_KEY = "your-qdrant-api-key"
COLLECTION_NAME = "rag_chunks"

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

# === OpenAI Setup ===
openai.api_key = "your-openai-api-key"

# === Embedding Function ===
def embed(text: str) -> list[float]:
    res = openai.Embedding.create(
        input=text,
        model="text-embedding-3-small"
    )
    return res["data"][0]["embedding"]

# === Upload & Process PDF ===
async def process_pdf_and_store(pdf_file):

    pdf_bytes = await pdf_file.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    vectors = []
    for i, page in enumerate(doc):
        print(f"📄 Page {i + 1} extracted text: {text[:100]}")
        text = page.get_text()
        if text.strip():
            vector = embed(text[:2000])  # Truncate long text
            vectors.append(PointStruct(
                id=str(uuid.uuid4()),
                vector=vector,
                payload={"text": text, "page": i + 1}
            ))
    

    if not vectors:
        raise ValueError("No valid content found in the uploaded PDF.")

    # Create collection if needed
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

# === Query & Generate Answer ===
async def generate_answer(query: str, architectures: list[str]):
    query_vector = embed(query)

    search = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=3,
        with_payload=True
    )

    top_chunks = "\n---\n".join(hit.payload["text"] for hit in search)

    system_prompt = (
        "You are a helpful assistant answering based only on the document chunks below.\n\n"
        f"{top_chunks}\n\n"
        "Answer the question:"
    )

    chat = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ]
    )

    answer = chat["choices"][0]["message"]["content"]

    return {
        arch: {
            "answer": answer,
            "context": top_chunks,
            "timeTaken": 1000,
            "pageNumber": search[0].payload["page"],
            "score": 0.95
        }
        for arch in architectures
    }
