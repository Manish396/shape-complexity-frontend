import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ExternalShapeComplexity from './ExternalShpaeComplexity';

function CalculateExternalMatrix() {
  const [isLoading, setLoading] = useState(true);
  const [isMatrix, setMatrix] = useState(undefined);

  useEffect(() => {
    fetch('http://localhost:8000/getOuterMatrix', {
      method: 'GET',
    }).then((response) => response.json().then((json) =>{
        setLoading(false);
        console.log(json)
        setMatrix(json);
    }))
  }, []);
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {isMatrix && (
        <p style={{
            padding: '0.5rem 2.5rem',
            marginLeft: '2rem',
            fontSize: '1.2rem',
            font: 'inherit',
            color: 'green',
            fontWeight: 'bold'
          }}>Dissimilirity matrix of External images caluclated successfully</p>
      )}
      {isMatrix && <ExternalShapeComplexity/>}
    </div>
  );
}

export default CalculateExternalMatrix;