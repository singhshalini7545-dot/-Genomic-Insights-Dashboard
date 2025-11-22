# Genomic-Insights-Dashboard
A full-stack web application for educational genomic analysis that processes 23andMe-style DNA data files and provides trait insights. Built with React.js frontend and Flask Python backend.


🌟 Features
📁 File Upload: Drag & drop interface for 23andMe format DNA files

🧬 Genetic Analysis: Processes 15+ genetic variants for traits and health markers

📊 Visual Reports: Beautiful, categorized report display

🔒 Privacy First: Files processed temporarily, no permanent storage

🎯 Educational Focus: Designed for learning about genomics

⚡ Real-time Processing: Instant analysis and results

📱 Responsive Design: Works on desktop and mobile devices


🛠 Technology Stack
Frontend
React.js - User interface

React Dropzone - File upload handling

Axios - API communication

CSS3 - Styling and animations


Backend
Flask - Python web framework

Flask-CORS - Cross-origin resource sharing

Python 3.8+ - Core processing logic


📥 Installation

Prerequisites
For macOS:
bash
# Install Python 3
brew install python

# Install Node.js
brew install node

For Windows:
Install Python 3.8+ from python.org

Install Node.js from nodejs.org

Enable WSL (Recommended) for better development experience

Clone the Repository
bash
git clone https://github.com/yourusername/genomic-dashboard.git
cd genomic-dashboard

🚀 Quick Start
1. Backend Setup (Terminal 1)
bash
# Navigate to backend
cd backend

# Create virtual environment (macOS/Linux)
python3 -m venv venv
source venv/bin/activate

# On Windows:
# python -m venv venv
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Generate sample data
python sample_data.py

# Start backend server
python app.py
2. Frontend Setup (Terminal 2)
bash
# Navigate to frontend (in new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm start

3. Access the Application
Frontend: http://localhost:3000

Backend API: http://localhost:5000

Health Check: http://localhost:5000/health


📖 Usage
Prepare Your Data: Use 23andMe format DNA files (.txt)

Upload File: Drag & drop or click to select file

View Analysis: See categorized genetic insights including:

Physical Traits (Eye color, Hair color, Skin tone)

Fitness & Athletic Performance

Metabolism & Weight Management

Neurology & Stress Response

Nutrition & Food Responses

Sleep Patterns


🗂 Project Structure
text
genomic-dashboard/
├── backend/
│   ├── venv/                 # Virtual environment (auto-created)
│   ├── uploads/              # Temporary file storage
│   ├── app.py               # Main Flask application
│   ├── genomic_processor.py # DNA analysis logic
│   ├── security.py          # File security utilities
│   ├── sample_data.py       # Sample data generator
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.js    # File upload component
│   │   │   ├── ReportDisplay.js # Results display
│   │   │   └── TraitCard.js     # Individual trait card
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Stylesheets
│   │   └── index.js         # React entry point
│   ├── public/
│   │   └── index.html       # HTML template
│   └── package.json         # Node.js dependencies
└── README.md



Generate sample files:

bash
cd backend
python sample_data.py

🧬 Genetic Variants Analyzed
The application analyzes 15+ genetic variants including:

Physical Traits
rs12913832 (HERC2) - Eye Color

rs7495174 (OCA2) - Eye Color Probability

rs12896399 (SLC24A4) - Skin Pigmentation

rs12203592 (IRF4) - Hair Color

rs1805007 (MC1R) - Red Hair & Fair Skin

Fitness & Performance
rs1815739 (ACTN3) - Muscle Fiber Type

rs1049434 (MCT1) - Lactate Transport

Health & Metabolism
rs9939609 (FTO) - Weight Management

rs17782313 (MC4R) - Appetite Regulation

rs4680 (COMT) - Stress Response

rs6265 (BDNF) - Memory & Learning

Nutrition
rs4988235 (LCT) - Lactose Tolerance

rs1761667 (CD36) - Fat Taste Sensitivity

Sleep
rs228697 (PER3) - Sleep Patterns


Development Setup
bash
# Backend development
cd backend
source venv/bin/activate
python app.py

# Frontend development  
cd frontend
npm start
⚠️ Disclaimer
IMPORTANT: This application is for EDUCATIONAL AND RESEARCH PURPOSES ONLY.

🚫 Not Medical Advice: This tool does not provide medical advice

🚫 Not for Diagnosis: Should not be used for disease diagnosis or treatment

🚫 Not Clinical Grade: Analysis is simplified for educational purposes

✅ For Learning: Intended to help understand basic genetic concepts

✅ Research Tool: Useful for bioinformatics and computational biology education

Always consult with qualified healthcare professionals for medical advice.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
