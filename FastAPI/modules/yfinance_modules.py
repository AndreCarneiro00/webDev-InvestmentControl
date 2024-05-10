import yfinance as yf
from sqlalchemy.orm import Session
import pandas as pd
from FastAPI.db_files import crud, database, models

def get_tickers_info(db: Session, stock_names: list):
    stock_names = list(map(lambda x: x.capitalize() + ".SA", stock_names))
    tickers_string = " ".join(stock_names)
    tickers = yf.Tickers(tickers_string)
    current_db_tickets_info = crud.read_ticker_infos(db)
    lst_ticker_info = [t.ticker for t in current_db_tickets_info]

    for k, ticker in tickers.tickers.items():
        df_cnpjs = pd.read_parquet("../db_files/cnpjs_by_ticker.parquet")
        ticker_ticker = ticker.ticker.replace(".SA", "")
        if ticker_ticker in df_cnpjs["Código"].tolist():
            cnpj = df_cnpjs[df_cnpjs["Código"] == ticker_ticker].reset_index(drop=True).iloc[0]["CNPJ"]
        else:
            cnpj = ""

        dict_ticker_info = ticker.info.copy()
        dict_ticker_info["ticker"] = ticker_ticker
        dict_ticker_info["cnpj"] = cnpj
        keys_to_drop = ["address1", "address2", "city", "state", "zip", "country", "phone", "industryKey", "sector",
                        "sectorKey", "52WeekChange"]
        dict_ticker_info = {k: v for k, v in dict_ticker_info.items() if k not in keys_to_drop}

        if not lst_ticker_info:
            crud.create_ticker_info(dict_ticker_info, db)
        elif ticker_ticker not in lst_ticker_info:
            crud.create_ticker_info(dict_ticker_info, db)
        else:
            # Update infos
            pass

def get_tickers_stmts(db: Session, stock_names: list):
    pass

if __name__ == "__main__":
    models.Base.metadata.create_all(bind=database.engine)
    SessionLocal = database.SessionLocal()
    get_tickers_info(SessionLocal, ["vale3", "sapr4"])