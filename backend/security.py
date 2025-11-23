# backend/security.py
import hashlib
import os
from datetime import datetime, timedelta
import re

def generate_file_hash(content):
    """Generate hash for file content"""
    return hashlib.sha256(content).hexdigest()

def sanitize_filename(filename):
    """Remove potentially dangerous characters from filename"""
    # Remove directory path attempts
    filename = os.path.basename(filename)
    # Keep only alphanumeric, spaces, dots, underscores, and hyphens
    filename = re.sub(r'[^\w\s.-]', '', filename)
    # Limit length
    filename = filename[:100]
    return filename

def cleanup_old_files(upload_folder, hours=24):
    """Clean up files older than specified hours"""
    try:
        now = datetime.now()
        for filename in os.listdir(upload_folder):
            filepath = os.path.join(upload_folder, filename)
            if os.path.isfile(filepath):
                file_time = datetime.fromtimestamp(os.path.getctime(filepath))
                if now - file_time > timedelta(hours=hours):
                    os.remove(filepath)
                    print(f"Cleaned up old file: {filename}")
    except Exception as e:
        print(f"Error during cleanup: {e}")
