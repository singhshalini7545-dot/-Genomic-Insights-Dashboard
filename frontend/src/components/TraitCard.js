import React from 'react';

const TraitCard = ({ data, type = 'trait' }) => {
  const getSignificanceClass = (significance) => {
    switch (significance?.toLowerCase()) {
      case 'high': return 'significance-high';
      case 'moderate': return 'significance-moderate';
      case 'low': return 'significance-low';
      default: return 'significance-moderate';
    }
  };

  return (
    <div className={`trait-card ${type}`}>
      <div className="trait-header">
        <div className="trait-name">{data.trait}</div>
        <span className="gene">{data.gene}</span>
      </div>
      
      <div className="category">{data.category}</div>
      
      <div className="genotype">
        Your Genotype: {data.your_genotype}
      </div>
      
      <div className="interpretation">
        {data.interpretation}
      </div>
      
      {data.significance && (
        <span className={`significance ${getSignificanceClass(data.significance)}`}>
          {data.significance} Significance
        </span>
      )}
    </div>
  );
};

export default TraitCard;
