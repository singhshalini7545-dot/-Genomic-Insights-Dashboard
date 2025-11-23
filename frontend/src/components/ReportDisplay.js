import React from 'react';
import TraitCard from './TraitCard';

const ReportDisplay = ({ report, onReset }) => {
  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Your Genomic Report</h2>
        <button className="reset-btn" onClick={onReset}>
          Analyze Another File
        </button>
      </div>
      
      {/* Summary Section */}
      <div className="summary-section">
        <h3>Analysis Summary</h3>
        <div className="summary-cards">
          <div className="summary-card">
            <span className="number">{report.summary.total_snps_analyzed?.toLocaleString()}</span>
            <span className="label">SNPs Analyzed</span>
          </div>
          <div className="summary-card">
            <span className="number">{report.summary.traits_found}</span>
            <span className="label">Traits Found</span>
          </div>
          <div className="summary-card">
            <span className="number">{report.summary.health_risks_found}</span>
            <span className="label">Health Markers</span>
          </div>
          <div className="summary-card">
            <span className="number">{report.summary.matched_snps}</span>
            <span className="label">Matched Variants</span>
          </div>
        </div>
      </div>
      
      {/* Traits Section */}
      {report.traits && report.traits.length > 0 && (
        <div className="traits-section">
          <h3>Physical Traits & Characteristics</h3>
          <div className="traits-grid">
            {report.traits.map((trait, index) => (
              <TraitCard key={index} data={trait} type="trait" />
            ))}
          </div>
        </div>
      )}
      
      {/* Health Section */}
      {report.health_risks && report.health_risks.length > 0 && (
        <div className="health-section">
          <h3>Health-Related Markers</h3>
          <div className="health-grid">
            {report.health_risks.map((risk, index) => (
              <TraitCard key={index} data={risk} type="health" />
            ))}
          </div>
        </div>
      )}
      
      {(!report.traits || report.traits.length === 0) && 
       (!report.health_risks || report.health_risks.length === 0) && (
        <div className="no-results">
          <h3>No Variants Matched</h3>
          <p>No known traits or health markers were found in your genomic data.</p>
          <p>This could be because your file format is different or contains variants not in our educational database.</p>
        </div>
      )}
    </div>
  );
};

export default ReportDisplay;
