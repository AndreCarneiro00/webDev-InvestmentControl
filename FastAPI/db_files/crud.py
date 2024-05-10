from sqlalchemy.orm import Session
from . import models
from . import schemas


def create_note(note_infos_operations:dict, db: Session):
    note_infos = note_infos_operations["noteInfos"]
    note_operations = note_infos_operations["noteOperations"]
    for note_operation in note_operations:
        note_infos_copy = note_infos.copy()
        for k, v in note_operation.items():
            note_infos_copy[k] = v
        
        db_note = models.Notes(**note_infos_copy)
        db.add(db_note)  # TODO bulk insert
    
    db.commit()


def create_ticker_info(ticker_infos: dict, db: Session):
    db_ticker_info = models.TickersInfos(**ticker_infos)
    db.add(db_ticker_info)
    db.commit()
    db.refresh(db_ticker_info)
    return db_ticker_info


def create_ticker_stmts(stmts: dict, db: Session):
    db_ticker_info = models.BalanceSheet(**stmts["bs"])
    db_ticker_info = models.IncomeStmt(**stmts["incomeStmt"])
    db_ticker_info = models.CashFlow(**stmts["cashFlow"])
    db.add(db_ticker_info)
    db.commit()
    db.refresh(db_ticker_info)
    return db_ticker_info


def create_event(events: schemas.Events, db: Session):
    db_event = models.Events(**events.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def read_notes(db: Session):
    notes = db.query(models.Notes).all()
    return notes

def read_ticker_infos(db: Session):
    ticker_infos = db.query(models.TickersInfos).all()
    return ticker_infos

def read_events(db: Session):
    events = db.query(models.Events).all()
    return events


def update_tickerInfo(db: Session, ticker: str, price: float, min_last_252_days: float, max_last_252_days: float):
    db.query(models.TickersInfos).filter_by(ticker=ticker).update({"price": price, "min_last_252_days": min_last_252_days, "max_last_252_days": max_last_252_days})
    db.commit()

def delete_note_row_by_ids(ids: list, db: Session):
    rows = db.query(models.Notes).filter(models.Notes.id.in_(ids))
    rows.delete(synchronize_session=False)
    db.commit()
    return {"rows deleted": rows}    
