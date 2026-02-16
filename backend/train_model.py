import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv("pcos_dataset.csv")

X = df.drop("PCOS", axis=1)
y = df["PCOS"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier()
model.fit(X_train, y_train)

joblib.dump(model, "model.pkl")

print("Model trained and saved as model.pkl")
