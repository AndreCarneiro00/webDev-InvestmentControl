import pandas as pd

df_cnpjs = pd.read_excel("cnpjs_by_ticker.xlsx")
df_cnpjs_parquet = pd.read_parquet("cnpjs_by_ticker.parquet")
lst_dfs = []
for i,row in df_cnpjs.iterrows():
    if pd.isna(row["Código"]):
        lst_dfs.append(pd.DataFrame({"Empresa": [row["Empresa"]], "Código": [row["Código"]], "CNPJ": [row["CNPJ"]]}))
    elif "," in row["Código"]:
        codigos = row["Código"].split(", ")
        for codigo in codigos:
            lst_dfs.append(pd.DataFrame({"Empresa": [row["Empresa"]], "Código": [codigo], "CNPJ": [row["CNPJ"]]}))
    else:
        lst_dfs.append(pd.DataFrame({"Empresa": [row["Empresa"]], "Código": [row["Código"]], "CNPJ": [row["CNPJ"]]}))

df_tratado = pd.concat(lst_dfs)
df_tratado.to_parquet("cnpjs_by_ticker.parquet", engine="fastparquet")
