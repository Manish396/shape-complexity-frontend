import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function ComplexityMetric(props) {
  const [isLoading, setLoading] = useState(true);
  const [isMetric, setMetric] = useState([]);
  useEffect(() => {
    fetch(
      'http://localhost:8000/shapeComplexity?' +
        new URLSearchParams({
          weight: props.weight,
        })
    ).then((response) =>
      response.json().then((json) => {
        setLoading(false);
        setMetric(json);
      })
    );
  }, []);
  const paraStyle = {
    padding: '0.5rem 2.5rem',
    marginLeft: '2rem',
    fontSize: '1.2rem',
    font: 'inherit',
    fontWeight: 'bold',
  };
  const value1 = <p style={{ color: 'green' }}>{isMetric.OuterImage}</p>;
  const value2 = <p style={{ color: 'green' }}>{isMetric.SlicedImage}</p>;
  const value3 = <p style={{ color: 'green' }}>{isMetric.combined}</p>;
  return (
    <div style={{ marginBottom: '2rem' }}>
      {isLoading && <LoadingSpinner />}
      {isMetric && (
        <div>
          <p style={paraStyle}>External Images Complexity Metric: {value1}</p>
          <p style={paraStyle}>Sliced Images Complexity Metric: {value2}</p>
          <p style={paraStyle}>Combined shape complexity Metric: {value3}</p>
          <p style={paraStyle}>{isMetric.Message}</p>
        </div>
      )}
    </div>
  );
}

export default ComplexityMetric;
