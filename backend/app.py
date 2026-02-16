from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully")
except:
    print("❌ Model not found. Run train_model.py first")
    model = None

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    data = request.get_json()
    
    # Extract features
    age = float(data['age'])
    bmi = float(data['bmi'])
    cycle_length = float(data['cycleLength'])
    lh_level = float(data['lhLevel'])
    fsh_level = float(data['fshLevel'])
    insulin_level = float(data['insulinLevel'])
    acne_severity = int(data['acneSeverity'])
    hirsutism_score = int(data['hirsutismScore'])
    
    # Calculate LH/FSH ratio
    lh_fsh_ratio = lh_level / fsh_level
    
    # Create feature array
    features = np.array([[age, bmi, cycle_length, lh_level, fsh_level,
                         insulin_level, lh_fsh_ratio, acne_severity, hirsutism_score]])
    
    # Predict
    pcos_probability = model.predict_proba(features)[0][1]
    pcos_risk = round(pcos_probability * 100, 2)
    
    # Determine category
    if pcos_risk < 30:
        category = 'Low'
    elif pcos_risk < 60:
        category = 'Moderate'
    else:
        category = 'High'
    
    # Calculate cancer risk
    cancer_risk = round(min(100, (pcos_probability * 25 + 
                                  (0.15 if age > 40 else 0.08 if age > 30 else 0.03) * 100 +
                                  (0.1 if bmi > 30 else 0.05 if bmi > 25 else 0) * 100 +
                                  (0.08 if insulin_level > 20 else 0.04 if insulin_level > 15 else 0) * 100)), 2)
    
    return jsonify({
        'pcosRisk': pcos_risk,
        'pcosCategory': category,
        'cancerRisk': cancer_risk,
        'confidence': round(max(pcos_probability, 1 - pcos_probability) * 100, 2),
        'lhFshRatio': round(lh_fsh_ratio, 2)
    })

if __name__ == '__main__':
    print("\n🚀 Starting Flask API Server...")
    print("Server: http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
    