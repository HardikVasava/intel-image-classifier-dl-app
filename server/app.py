from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
from io import BytesIO  

app = Flask(__name__)
CORS(app)


IMG_HEIGHT = 150
IMG_WIDTH = 150


CLASS_LABELS = ['buildings', 'forest', 'glacier', 'mountain', 'sea', 'street']


MODEL_PATH = os.path.abspath('../model-training/models/intel_model.keras')
model = load_model(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No image file uploaded'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image_bytes = BytesIO(file.read())


        img = load_img(image_bytes, target_size=(IMG_HEIGHT, IMG_WIDTH))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)


        predictions = model.predict(img_array)
        predicted_index = int(np.argmax(predictions))
        predicted_label = CLASS_LABELS[predicted_index]
        confidence = float(np.max(predictions))

        return jsonify({
            'label': predicted_label,
            'confidence': round(confidence * 100, 2)
        })

    except Exception as e:
        app.logger.error(f"Prediction error: {e}")
        return jsonify({'error': 'Prediction failed. Check server logs for more info.'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
