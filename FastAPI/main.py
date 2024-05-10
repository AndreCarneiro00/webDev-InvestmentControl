from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from typing import Annotated, List

from db_files import crud, models, schemas
from db_files.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    'http://localhost:3000'
]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/get_all_notes")
async def get_all_notes(db: Session = Depends(get_db)):
    return crud.read_notes(db)

@app.post("/create_note")
async def create_note(note_infos_operations:dict, db: Session = Depends(get_db)):
    crud.create_note(note_infos_operations, db)

@app.post("/create_ticker_info", response_model=schemas.TickersInfos)
async def create_ticker_info(ticker_infos: schemas.TickersInfos, db: Session = Depends(get_db)):
    return crud.create_ticker_info(ticker_infos.dict(), db)

@app.post("/create_event", response_model=schemas.Events)
async def create_event(events: schemas.Events, db: Session = Depends(get_db)):
    return crud.create_event(events, db)

@app.post("/delete_note_row_by_ids")
async def delete_note_row_by_ids(ids:list, db: Session = Depends(get_db)):
    return crud.delete_note_row_by_ids(ids, db)

