# 🌍 Intel Scene Classifier

A deep learning-powered web app to classify scenes in images using Convolutional Neural Networks (CNNs). Built with **TensorFlow**, **Keras**, **Flask**, and **React**, it delivers real-time predictions via an interactive frontend.

---

## 🔍 Features

- 🎯 **Accurate Predictions** using a trained CNN model
- 🖼️ **6 Scene Categories**: Buildings, Forest, Glacier, Mountain, Sea, Street
- ⚡ **Fast API** with Flask and TensorFlow
- 🧑‍💻 **Modern UI** built using React + TailwindCSS
- 🔄 **Live Preview** of uploaded image and prediction

---

## 🧠 Scene Categories

Trained on the [Intel Image Classification Dataset](https://www.kaggle.com/datasets/puneet6060/intel-image-classification), the model predicts the following categories:

- 🏢 **Buildings**
- 🌲 **Forest**
- ❄️ **Glacier**
- 🏔️ **Mountain**
- 🌊 **Sea**
- 🛣️ **Street**

---

## 📁 Project Structure

```
intel-scene-classifier/
├── model-training/          # Model training and evaluation
├── backend/                 # Flask API
│   ├── app.py              # Main server script
│   └── models/             # Trained .keras model
├── frontend/               # React UI
│   └── App.js              # Upload + predict interface
└── README.md               # This file
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HardikVasava/intel-image-classifier-dl-app.git
cd intel-image-classifier-dl-app
```

### 2. Backend Setup (Flask)

```bash
cd backend
pip install -r requirements.txt
```

Place your trained model as `models/intel_model.keras`

Run the backend server:

```bash
python app.py
```

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

---

## 🧪 API Usage

### POST /predict
- **Request**: `multipart/form-data` with `file=<image>`
- **Response**:

```json
{
  "label": "forest",
  "confidence": 93.57
}
```

---

## 🧱 Model Summary

- **Input Shape**: 150x150x3
- **Architecture**:
  - Conv2D → MaxPooling2D (×3)
  - Flatten → Dense → Dropout
  - Output: Softmax (6 categories)
- **Loss**: categorical_crossentropy
- **Optimizer**: adam

---

## 🛠️ Tech Stack

- **TensorFlow / Keras** – Model training & prediction
- **Flask** – Backend REST API
- **React** – Frontend application
- **Tailwind CSS** – UI styling
- **Matplotlib / Seaborn** – Data visualization (training)

---

## 📦 Deployment

- Flask server runs on port 5000
- React frontend runs on port 3000
- Ensure CORS is enabled for cross-origin access

---

## 🤝 Contributing

Pull requests are welcome! Here's how to contribute:

```bash
git checkout -b feature/your-feature
git commit -m "Add new feature"
git push origin feature/your-feature
```

Then open a pull request ✨

---

## 🙏 Acknowledgments

- [Intel Image Classification Dataset](https://www.kaggle.com/datasets/puneet6060/intel-image-classification) for training data
- TensorFlow team for the amazing deep learning framework
- React and Flask communities for excellent documentation