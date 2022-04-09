from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import httpx

BASE_URL = 'https://www.reddit.com/'

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/{sub}/{sort}/")
async def relay(sub: str, sort: str = 'hot', limit: Optional[int] = 10):
    async with httpx.AsyncClient() as client:
        response = await client.get(f'{BASE_URL}/r/{sub}/{sort}.json?limit={limit}')
        return response.json()