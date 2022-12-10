import React, { useState } from 'react';

const ExternalShapeComplexity = () => {

  const downloadData = () => {
    fetch('http://localhost:8000/downloadOuterMatrix').then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'outerImages_ESCM.xlsx';
        a.click();
      });
    });
  };

  const buttonstyle = {
    font: 'inherit',
    border: '1px solid #4f005f',
    background: '#4f005f',
    color: 'white',
    padding: '0.5rem 2.5rem',
    cursor: 'pointer',
    margin: '2rem',
    fontSize: '1.2rem',
    borderRadius: '2rem',
  };

  return (
    <div
      id="container"
      style={{
        padding: '0.5rem 2.5rem',
        margin: '2rem',
        fontSize: '1.2rem',
        font: 'inherit'
      }}
    >
      <span>Click Download!, To download the caluclated matrix data.</span>
      <button onClick={downloadData} style={buttonstyle}>
        Download
      </button>
    </div>
  );
};

export default ExternalShapeComplexity;