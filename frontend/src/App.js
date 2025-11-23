import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ReportDisplay from './components/ReportDisplay';
import './App.css';

function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Genomic Insights Dashboard</h1>
        <p>Educational genomic analysis tool - For Research Purposes Only</p>
      </header>
      
      <main>
        {!report ? (
          <FileUpload 
            setReport={setReport} 
            loading={loading} 
            setLoading={setLoading} 
          />
        ) : (
          <ReportDisplay 
            report={report} 
            onReset={() => setReport(null)} 
          />
        )}
      </main>
      
      <footer>
        <div className="disclaimer">
          <strong>⚠️ Educational Purpose Only:</strong> This tool is for educational and 
          informational purposes only. It is not medical advice. The information provided 
          should not be used for diagnosing or treating health conditions. Always consult 
          with qualified healthcare professionals for medical advice.
        </div>
      </footer>
    </div>
  );
}

export default App;
