import pandas as pd
import numpy as np

np.random.seed(42)

n = 10000

data = {
    "age": np.random.randint(18, 45, n),
    "bmi": np.random.uniform(18, 35, n),
    "cycleLength": np.random.randint(21, 45, n),
    "lhLevel": np.random.uniform(2, 20, n),
    "fshLevel": np.random.uniform(2, 15, n),
    "insulinLevel": np.random.uniform(5, 30, n),
    "acneSeverity": np.random.randint(0, 3, n),
    "hirsutismScore": np.random.randint(0, 3, n)
}

df = pd.DataFrame(data)

df["PCOS"] = (
    (df["bmi"] > 27).astype(int) +
    (df["cycleLength"] > 35).astype(int) +
    (df["lhLevel"] / df["fshLevel"] > 2).astype(int)
)

df["PCOS"] = (df["PCOS"] > 1).astype(int)

df.to_csv("pcos_dataset.csv", index=False)

print("Dataset created: pcos_dataset.csv")
