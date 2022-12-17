import React, { useState, useEffect } from 'react';
import STLViewer from '../../src/STLViewer';
import LoadingSpinner from '../../src/LoadingSpinner';
import CalculateSlicedMatrix from '../../src/CalculateSlicedMatrix';
import CalculateExternalMatrix from '../../src/CalculateExternalMatrix';
import ComplexityMetric from '../../src/ComplexityMetric';

function App() {
  const [color, setColour] = useState('#808080');
  const [model, setModel] = useState(undefined);
  const [rawmodel, setRawModel] = useState(undefined);
  const [isOuterLoading, setIsOuterLoading] = useState(false);
  const [isSlicedLoading, setIsSlicedLoading] = useState(false);
  const [outerRes, setOuterRes] = useState(undefined);
  const [slicedRes, setSlicedRes] = useState(undefined);
  const [isMetric, setMetric] = useState(false);
  const [isAxis, setAxis] = useState('X');
  const [step, setStep] = useState(1);
  const [internalWeightage, setInternalWeightage] = useState(undefined);
  const [externalWeightage, setExternalWeightage] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {}, 1000);
  }, [model]);

  const clickBlue = (e) => {
    e.preventDefault();
    setColour('#0000FF');
  };

  const clickRed = (e) => {
    e.preventDefault();
    setColour('#FF0000');
  };

  const clickDefault = (e) => {
    e.preventDefault();
    setColour('#808080');
  };

  const axisHandler = (e) => {
    setAxis(e.target.value);
  };
  const stepHandler = (e) => {
    setStep(e.target.value);
  };
  const generateOuterImages = (e) => {
    e.preventDefault();
    if (rawmodel === undefined) {
      return null;
    }
    setIsOuterLoading(true);
    e.currentTarget.disabled = true;
    var fd = new FormData();
    fd.append('file', rawmodel, rawmodel.name);
    fetch('http://localhost:8000/generateOuterImages', {
      method: 'POST',
      body: fd,
    }).then((response) =>
      response.json().then((json) => {
        setIsOuterLoading(false);
        console.log(json);
        setOuterRes(json);
      })
    );
  };

  const generateSlicedImages = (e) => {
    e.preventDefault();
    if (rawmodel === undefined) {
      return null;
    }
    setIsSlicedLoading(true);
    e.currentTarget.disabled = true;
    var fd = new FormData();
    fd.append('file', rawmodel, rawmodel.name);

    fetch(
      'http://localhost:8000/generateSlicedImages?' +
        new URLSearchParams({
          axis: isAxis,
          step: step,
        }),
      {
        method: 'POST',
        body: fd,
      }
    ).then((response) =>
      response.json().then((json) => {
        setIsSlicedLoading(false);
        console.log(json);
        setSlicedRes(json);
      })
    );
  };

  const calculateComplexityMetric = (e) => {
    e.preventDefault();
    if (rawmodel === undefined) {
      return null;
    }
    e.currentTarget.disabled = true;
    setMetric(true);
  };

  const onChange = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = () => {
      setModel(reader.result);
    };
    setRawModel(files[0]);
  };
  const internalWeightageHandler = (e) => {
    const wt = e.target.value;
    setInternalWeightage(wt);
  };
  const externalWeightageHandler = (e) => {
    const wt = e.target.value;
    setExternalWeightage(wt);
  };
  const div_style = {
    margin: 'auto',
    width: '80%',
    padding: '1rem',
  };

  const buttonstyle = {
    font: 'inherit',
    border: '1px solid #4f005f',
    background: '#4f005f',
    color: 'white',
    padding: '0.5rem 2.5rem',
    cursor: 'pointer',
    margin: '1rem',
    fontSize: '1.2rem',
    borderRadius: '2rem',
  };

  return (
    <div style={div_style}>
      <div style={{ margin: '0.5rem' }}>
        <input
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            background: '#4f005f',
            color: 'white',
            padding: '0.5em',
            border: 'thin solid grey',
            borderRadius: '0.5rem',
          }}
          id="image-file"
          type="file"
          placeholder="Choose an STL File"
          onChange={onChange}
        />
      </div>

      <STLViewer
        modelColor={color}
        lights={[
          [0.5, 1, -1],
          [1, 1, 1],
        ]}
        rotate={true}
        model={model}
      />
      <button style={buttonstyle} onClick={clickDefault}>
        Grey
      </button>
      <button style={buttonstyle} onClick={clickRed}>
        Red
      </button>
      <button style={buttonstyle} onClick={clickBlue}>
        Blue
      </button>
      <hr width="100%" />
      {model && (
        <div style={{ margin: '2rem' }}>
          <span style={{ fontWeight: 'bold', margin: '2rem' }}>
            Click to generate external images of the model
          </span>
          <button
            style={buttonstyle}
            onClick={generateOuterImages}
            disabled={isOuterLoading}
          >
            Generate Outer Images
          </button>
          {isOuterLoading && <LoadingSpinner />}
          {outerRes && (
            <p
              style={{
                padding: '0.5rem 2.5rem',
                marginLeft: '2rem',
                fontSize: '1.2rem',
                font: 'inherit',
                color: 'green',
                fontWeight: 'bold',
              }}
            >
              22 Images has been generated successfully
            </p>
          )}
          {outerRes && <CalculateExternalMatrix />}
        </div>
      )}
      {model && (
        <div style={{ margin: '2rem' }}>
          <span style={{ fontWeight: 'bold', margin: '2rem' }}>
            Generate sliced images of the model
          </span>
          <div>
            <form style={{ display: 'flex' }} onSubmit={generateSlicedImages}>
              <div class="form-group" style={{ marginLeft: '2rem' }}>
                <label for="exampleFormControlSelect1">Select Axis</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  style={{ maxWidth: '5rem' }}
                  onChange={axisHandler}
                >
                  <option>X</option>
                  <option>Y</option>
                  <option>Z</option>
                </select>
              </div>
              <div class="form-group" style={{ marginLeft: '2rem' }}>
                <label for="exampleFormControlTextarea1">steps (Inches)</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  style={{ maxWidth: '5rem' }}
                  onChange={stepHandler}
                ></textarea>
              </div>
              <button
                style={buttonstyle}
                disabled={isSlicedLoading}
                type="submit"
              >
                Generate Sliced Images
              </button>
            </form>
          </div>
          {isSlicedLoading && <LoadingSpinner />}
          {slicedRes && (
            <p
              style={{
                padding: '0.5rem 2.5rem',
                marginLeft: '2rem',
                fontSize: '1.2rem',
                font: 'inherit',
                color: 'green',
                fontWeight: 'bold',
              }}
            >
              {slicedRes.Message}
            </p>
          )}
          {slicedRes && <CalculateSlicedMatrix size={slicedRes.count} />}
        </div>
      )}
      <hr width="100%" />
      {model && outerRes && slicedRes && (
        <div>
          <div>
            <label for="weight">Weightage (internal):</label>
            <br></br>
            <input
              type="text"
              id="weight"
              onChange={internalWeightageHandler}
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                background: '#4f005f',
                color: 'white',
                padding: '0.5em',
                border: 'thin solid grey',
                borderRadius: '0.5rem',
              }}
            />
          </div>
          <div>
            <label for="weight">Weightage (external):</label>
            <br></br>
            <input
              type="text"
              id="weight"
              onChange={externalWeightageHandler}
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                background: '#4f005f',
                color: 'white',
                padding: '0.5em',
                border: 'thin solid grey',
                borderRadius: '0.5rem',
              }}
            />
          </div>
          <button
            style={buttonstyle}
            onClick={calculateComplexityMetric}
            disabled={isOuterLoading}
          >
            Find complexity Metric
          </button>
          {isMetric && (
            <ComplexityMetric iw={internalWeightage} ew={externalWeightage} />
          )}
        </div>
      )}
    </div>
  );
}
export default App;
