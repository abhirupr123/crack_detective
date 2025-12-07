# Crack Detective

A computer-vision based web application that automates vehicle damage detection and component dimension measurement.

## Overview

**Crack Detective** is an advanced inspection tool designed to modernize automotive and manufacturing quality checks. By leveraging Machine Learning and Computer Vision, the application provides two core capabilities:
1.  **Crack & Dent Detection:** Identifies surface damages like cracks and dents on vehicle bodies or manufacturing parts.
2.  **Dimension Measurement:** Measures the geometric dimensions of objects (squares, triangles, polygons, etc.) in real-time or from static images.

The project features a sleek, dark-themed React frontend and a Python (Flask) backend powered by OpenCV and ML models.

## Features

-   **User Authentication:** Secure Sign In and Sign Up using Firebase Auth.
-   **Dashboard:**
    -   Switch between "Crack Detection" and "Dimension Measurement" modes.
    -   Integrated Webcam support for live capture.
    -   Drag-and-drop image upload functionality.
-   **Live Analysis:** Real-time video feed processing for dimension measurement.
-   **Results Visualization:** View processed images with bounding boxes/annotations highlighting detected damages or measured dimensions.
-   **Modern UI:** Responsive, dark-mode interface built with Chakra UI and Framer Motion.

## Tech Stack

### Frontend
-   **React.js:** Core UI library.
-   **Chakra UI:** Component library for accessible and responsive styling.
-   **Framer Motion:** For smooth animations and transitions.
-   **Firebase:** Authentication and backend services.
-   **Axios:** HTTP client for API requests.

### Backend
-   **Python (Flask):** REST API server.
-   **OpenCV:** Computer vision library for image processing.
-   **NumPy:** Numerical processing.
-   **ML Models:** Custom trained models for damage detection.

## Installation & Setup

### Prerequisites
-   Node.js & npm
-   Python 3.x
-   Pip

### 1. Clone the Repository
```bash
git clone <repository-url>
cd crack-detective
```

### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm start
```
The application will run on `http://localhost:3000`.

### 3. Backend Setup
Navigate to the root directory where `app.py` is located. It is recommended to create a virtual environment:

```bash
# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install flask opencv-python numpy firebase-admin
```

Start the Flask server:
```bash
python app.py
```
The server will typically run on `http://127.0.0.1:5000`.

## Usage

1.  **Sign Up/Login:** Create an account to access the dashboard.
2.  **Select Mode:** Choose between "Crack Detection" or "Dimension Measurement" from the tabs.
3.  **Input Data:**
    *   **Upload:** Select an image file from your device.
    *   **Camera:** Use the "Open Camera" button to capture a photo.
    *   **Live Feed:** Click "Start Live Feed" for real-time measurement (opens a separate window).
4.  **View Results:** After processing, click "Show Results" to see the analyzed image with detected defects or measurements.

## Project Structure

```
├── app.py                  # Main Flask backend application
├── crack.py                # Logic for crack/dent detection
├── model.py                # ML model definitions/loading
├── Measure.py              # Logic for dimension measurement
├── main_photo.py           # Additional photo processing logic
├── frontend/               # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components (Home, Scan, Results, etc.)
│   │   ├── Firebase.js     # Firebase configuration
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   └── package.json
└── images/                 # Sample images or processing output
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

