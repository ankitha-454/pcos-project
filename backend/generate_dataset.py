import pandas as pd
import numpy as np

np.random.seed(42)

print("Generating 10,000 PCOS patient records...")

# Generate features
age = np.random.normal(30, 8, 10000).clip(18, 50)
bmi = (np.random.gamma(2, 3, 10000) + 18).clip(15, 45)
cycle_length = np.random.choice([28, 30, 32, 35, 40, 45, 50, 55, 60], 10000, 
                                p=[0.35, 0.20, 0.15, 0.10, 0.08, 0.05, 0.04, 0.02, 0.01])
lh_level = np.random.gamma(2, 4, 10000).clip(1, 30)
fsh_level = np.random.gamma(2, 3, 10000).clip(1, 20)
insulin_level = np.random.gamma(3, 4, 10000).clip(2, 50)
acne_severity = np.random.choice([0, 1, 2, 3], 10000, p=[0.4, 0.35, 0.20, 0.05])
hirsutism_score = np.random.choice([0, 1, 2, 3], 10000, p=[0.45, 0.30, 0.20, 0.05])

# Create DataFrame
df = pd.DataFrame({
    'Age': age.round(0).astype(int),
    'BMI': bmi.round(1),
    'Cycle_Length': cycle_length,
    'LH_Level': lh_level.round(1),
    'FSH_Level': fsh_level.round(1),
    'Insulin_Level': insulin_level.round(1),
    'Acne_Severity': acne_severity,
    'Hirsutism_Score': hirsutism_score,
})

# Calculate LH/FSH ratio
df['LH_FSH_Ratio'] = (df['LH_Level'] / df['FSH_Level'].replace(0, 0.1)).round(2)

# Generate PCOS diagnosis
criteria_1 = (df['Cycle_Length'] > 35).astype(int)
criteria_2 = (df['LH_FSH_Ratio'] > 2).astype(int)
criteria_3 = ((df['Acne_Severity'] >= 2) | (df['Hirsutism_Score'] >= 2)).astype(int)
risk_score = criteria_1 * 0.4 + criteria_2 * 0.4 + criteria_3 * 0.2
df['PCOS_Diagnosis'] = (risk_score > 0.5).astype(int)

# Save
df.to_csv('pcos_dataset.csv', index=False)
print(f"✅ Dataset saved: pcos_dataset.csv")
print(f"Total samples: {len(df)}")
print(f"PCOS positive: {df['PCOS_Diagnosis'].sum()} ({df['PCOS_Diagnosis'].mean()*100:.1f}%)")