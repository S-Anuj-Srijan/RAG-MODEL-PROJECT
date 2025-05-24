# app/store.py
memory_store = {}

def save_result(query_id: str, result: dict):
    memory_store[query_id] = result

def get_result(query_id: str):
    return memory_store.get(query_id)
