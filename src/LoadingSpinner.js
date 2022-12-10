import React from 'react';

export default function LoadingSpinner() {
  return (
    <div style={{padding: '0.5rem 2.5rem', margin: '5px', fontSize: '1.2rem', font: "inherit"}}>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}
