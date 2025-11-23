import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = ({ setReport, loading, setLoading }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setReport(response.data);
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.response?.data?.error || 'Error processing file. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [setReport, setLoading]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const loadSampleData = async () => {
    setLoading(true);
    try {
      // For now, we'll simulate sample data since we don't have a sample endpoint
      const sampleReport = {
        traits: [
          {
            gene: "ACTN3",
            trait: "Athletic Performance",
            your_genotype: "CC",
            interpretation: "Enhanced endurance performance",
            category: "Fitness",
            significance: "Moderate"
          },
          {
            gene: "OCA2",
            trait: "Eye Color Probability", 
            your_genotype: "GG",
            interpretation: "Higher probability of blue/green eyes",
            category: "Physical Traits",
            significance: "High"
          }
        ],
        health_risks: [
          {
            gene: "FTO",
            trait: "Weight Management",
            your_genotype: "TT", 
            interpretation: "Lower risk of obesity",
            category: "Metabolism",
            significance: "Moderate"
          }
        ],
        summary: {
          total_snps_analyzed: 1500000,
          traits_found: 2,
          health_risks_found: 1,
          matched_snps: 3
        }
      };
      
      // Simulate API delay
      setTimeout(() => {
        setReport(sampleReport);
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Sample data error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing your genomic data...</p>
            <p>This may take a few seconds</p>
          </div>
        ) : (
          <>
            <div className="upload-icon">📤</div>
            <p>
              {isDragActive 
                ? "Drop your 23andMe file here..." 
                : "Drag & drop your 23andMe file here, or click to select"
              }
            </p>
            <small>Supported formats: .txt, .csv (23andMe format)</small>
          </>
        )}
      </div>
      
      <div className="sample-section">
        <h3>Don't have a 23andMe file?</h3>
        <button 
          className="sample-btn"
          onClick={loadSampleData}
          disabled={loading}
        >
          Try with Sample Data
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
