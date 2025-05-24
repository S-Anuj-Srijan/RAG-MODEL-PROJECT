# app/main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.store import save_result, get_result
from app.rag_engine import process_pdf_and_store, generate_answer
import uuid

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"]
)

# Model for query input
class QueryInput(BaseModel):
    query: str
    architectures: list[str]

@app.post("/upload_pdf")
async def upload_pdf(pdf: UploadFile = File(...)):
    if not pdf.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    try:
        await process_pdf_and_store(pdf)
        return {"message": "PDF uploaded and processed successfully."}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during PDF processing.")


@app.post("/query")
async def query_rag(data: QueryInput):
    query_id = str(uuid.uuid4())
    results = await generate_answer(data.query, data.architectures)
    save_result(query_id, results)
    return {"queryId": query_id, "results": results}

@app.get("/query_result/{query_id}")
async def get_saved_result(query_id: str):
    result = get_result(query_id)
    if not result:
        raise HTTPException(status_code=404, detail="Query not found")
    return {"results": result}
