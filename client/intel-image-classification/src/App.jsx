import React, { useState } from 'react';
import axios from 'axios';
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const FileInput = ({ onChange }) => (
  <div className="flex flex-col items-center justify-center w-full">
    <label
      htmlFor="image-upload"
      className="w-full cursor-pointer rounded border-2 border-dashed border-gray-300 bg-gray-100 p-4 text-center text-sm text-gray-600 hover:border-blue-500 hover:bg-blue-50 transition"
    >
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
        aria-label="Upload image"
      />
      Click to upload an image or drag and drop here
    </label>
  </div>
);

const ImagePreview = ({ src }) => (
  <div className="mt-4">
    <img
      src={src}
      alt="Image preview"
      className="w-full h-64 object-cover rounded-lg border shadow-sm"
    />
  </div>
);

const SubmitButton = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`w-full py-2 px-4 flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white ${
      loading
        ? 'bg-blue-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700'
    }`}
  >
    {loading ? (
      <>
        <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
        Predicting...
      </>
    ) : (
      'Predict'
    )}
  </button>
);

const ResultCard = ({ label, confidence }) => (
  <div className="mt-8 max-w-md w-full p-6 bg-white rounded-lg shadow-lg border border-blue-100 text-center">
    <CheckCircleIcon className="h-10 w-10 text-green-500 mx-auto mb-2" />
    <h2 className="text-xl font-bold text-gray-800 mb-1">Prediction Result</h2>
    <p className="text-gray-600">
      Scene classified as{' '}
      <span className="text-blue-700 font-semibold">{label}</span> with{' '}
      <span className="text-green-600 font-bold">{confidence}%</span> confidence.
    </p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="mt-4 text-red-600 text-sm flex items-center justify-center">
    <ExclamationCircleIcon className="h-5 w-5 mr-2" />
    {message}
  </div>
);

const App = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError('');
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data } = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Prediction failed. Please check the backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center tracking-tight">
        🧠 Intel Scene Classifier 🌍
      </h1>

      <section className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border space-y-4">
        <FileInput onChange={handleImageChange} />
        {preview && <ImagePreview src={preview} />}
        <SubmitButton onClick={handleSubmit} loading={loading} />
        {error && <ErrorMessage message={error} />}
      </section>

      {result && <ResultCard label={result.label} confidence={result.confidence} />}
    </main>
  );
};

export default App;
