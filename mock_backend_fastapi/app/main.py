from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI()

# Enable CORS for frontend testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulated in-memory store
query_store = {}

class QueryRequest(BaseModel):
    query: str
    architectures: list[str]

@app.post("/upload_pdf")
async def upload_pdf(pdf: UploadFile = File(...)):
    if not pdf.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    return {"message": "PDF uploaded successfully", "filename": pdf.filename}

@app.post("/query")
async def query_rag(request: QueryRequest):
    query_id = str(uuid.uuid4())
    mock_results = {
        arch: {
            "answer": f"This is a mocked answer for {arch}.",
            "context": f"Mock context chunk from {arch} retriever.",
            "timeTaken": 1234,
            "pageNumber": 3,
            "score": 0.88 + i * 0.02,
        }
        for i, arch in enumerate(request.architectures)
    }
    query_store[query_id] = mock_results
    return {"queryId": query_id, "results": mock_results}

@app.get("/query_result/{query_id}")
async def get_query_result(query_id: str):
    if query_id not in query_store:
        raise HTTPException(status_code=404, detail="Query ID not found.")
    return {"results": query_store[query_id]}
