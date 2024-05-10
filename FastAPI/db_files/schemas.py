from pydantic import BaseModel
from typing import Optional

class OurBaseModel(BaseModel):
    id: int | None

    class Config:
        orm_mode = True

class Notes(OurBaseModel):
    note: int
    broker: str
    opDate: str
    liqDate: str
    opType: str
    ticker: str
    quantity: float
    price: float

    # Brazilian taxes and fees per order
    irrf: float
    liqFee: float # Taxa de liquidacao
    registerFee: float # Taxa de registro
    derivativeFee: float  # Taxa Termo/Opções
    anaFee: float  # Taxa A.N.A.
    emolumentos: float
    operationalFee: float # Taxa operacional
    executionFee: float # Taxa de execucao
    custodyFee: float # Taxa de Custodia
    taxes: float
    others: float

class TickersInfos(OurBaseModel):
    ticker: str
    cnpj: str
    website: str
    industry: str
    industryDisp: str
    sectorDisp: str
    longBusinessSummary: str
    companyOfficers: str
    auditRisk: int
    boardRisk: int
    compensationRisk: int
    shareHolderRightsRisk: int
    overallRisk: int
    governanceEpochDate: int
    maxAge: int
    priceHint: int
    previousClose: float
    open: float
    dayLow: float
    dayHigh: float
    regularMarketPreviousClose: float
    regularMarketOpen: float
    regularMarketDayLow: float
    regularMarketDayHigh: float
    dividendRate: float
    dividendYield: float
    exDividendDate: int
    payoutRatio: float
    fiveYearAvgDividendYield: float
    beta: float
    trailingPE: float
    forwardPE: float
    volume: int
    regularMarketVolume: int
    averageVolume: int
    averageVolume10days: int
    averageDailyVolume10Day: int
    bid: float
    ask: float
    marketCap: int
    fiftyTwoWeekLow: float
    fiftyTwoWeekHigh: float
    priceToSalesTrailing12Months: float
    fiftyDayAverage: float
    twoHundredDayAverage: float
    trailingAnnualDividendRate: float
    trailingAnnualDividendYield: float
    currency: str
    enterpriseValue: int
    profitMargins: float
    floatShares: int
    sharesOutstanding: int
    heldPercentInsiders: float
    heldPercentInstitutions: float
    impliedSharesOutstanding: int
    bookValue: float
    priceToBook: float
    lastFiscalYearEnd: int
    nextFiscalYearEnd: int
    mostRecentQuarter: int
    earningsQuarterlyGrowth: float
    netIncomeToCommon: int
    trailingEps: float
    forwardEps: float
    pegRatio: float
    lastSplitFactor: str
    lastSplitDate: int
    enterpriseToRevenue: float
    enterpriseToEbitda: float
    fiftyTwoWeekChange: float
    SandP52WeekChange: float
    lastDividendValue: float
    lastDividendDate: int
    exchange: str
    quoteType: str
    symbol: str
    underlyingSymbol: str
    shortName: str
    longName: str
    firstTradeDateEpochUtc: int
    timeZoneFullName: str
    timeZoneShortName: str
    uuid: str
    messageBoardId: str
    gmtOffSetMilliseconds: int
    currentPrice: float
    targetHighPrice: float
    targetLowPrice: float
    targetMeanPrice: float
    targetMedianPrice: float
    recommendationMean: float
    recommendationKey: str
    numberOfAnalystOpinions: int
    totalCash: int
    totalCashPerShare: float
    ebitda: int
    totalDebt: int
    quickRatio: float
    currentRatio: float
    totalRevenue: int
    debtToEquity: float
    revenuePerShare: float
    returnOnAssets: float
    returnOnEquity: float
    freeCashflow: int
    operatingCashflow: int
    earningsGrowth: float
    revenueGrowth: float
    grossMargins: float
    ebitdaMargins: float
    operatingMargins: float
    financialCurrency: str
    trailingPegRatio: Optional[float] = None
    fullTimeEmployees: int


class Events(OurBaseModel):
    ticker: str
    event_type: str
    date: str
    quantity: int
    value: float

