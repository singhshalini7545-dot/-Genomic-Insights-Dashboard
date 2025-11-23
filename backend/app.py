from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from genomic_processor import process_genomic_file
from security import sanitize_filename, cleanup_old_files
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max
app.config['CLEANUP_HOURS'] = 24  # Clean files older than 24 hours

# Create upload directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'txt', 'csv'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Genomic API is running'})

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and processing"""
    # Clean up old files first
    cleanup_old_files(app.config['UPLOAD_FOLDER'], app.config['CLEANUP_HOURS'])
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        # Sanitize filename
        filename = sanitize_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(filepath)
            logger.info(f"File uploaded successfully: {filename}")
            
            # Process the genomic file
            results = process_genomic_file(filepath)
            
            # Remove file after processing (privacy)
            os.remove(filepath)
            
            return jsonify(results)
            
        except Exception as e:
            logger.error(f"Error processing file: {str(e)}")
            # Ensure file is removed even if processing fails
            if os.path.exists(filepath):
                os.remove(filepath)
            return jsonify({'error': f'Processing failed: {str(e)}'}), 500
    
    return jsonify({'error': 'Invalid file type. Please upload .txt or .csv files'}), 400

if __name__ == '__main__':
    print("Starting Genomic Insights Dashboard Backend...")
    print("Server running on http://localhost:5000")
    print("Health check: http://localhost:5000/health")
    app.run(debug=True, port=5000)
