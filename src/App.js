import React, { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ress, setRess] = useState([]);
  const [update, setUpdate] = useState({});
  const fname = useRef();
  const lname = useRef();
  const age = useRef();

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('data')) || [];
    setRess(arr);
  }, []);

  const click = () => {
    const obj = {
      fname: fname.current.value,
      lname: lname.current.value,
      age: age.current.value,
    };

    const updatedArr = [...ress, obj];
    setRess(updatedArr);
    localStorage.setItem('data', JSON.stringify(updatedArr));
  };

  const deleteData = (index) => {
    const updatedArr = ress.filter((_, i) => i !== index);
    setRess(updatedArr);
    localStorage.setItem('data', JSON.stringify(updatedArr));
  };

  const updateData = (val, ind) => {
    setUpdate({ ...val, index: ind });
  };

  const updateVal = () => {
    const updatedArr = [...ress];
    updatedArr[update.index] = update;
    setRess(updatedArr);
    localStorage.setItem('data', JSON.stringify(updatedArr));
    // setUpdate({});
  };

  return (
    <div>
      {/* Add New Data */}
      <input type="text" name="fname" ref={fname} placeholder="Enter a Fname" />
      <input type="text" name="lname" ref={lname} placeholder="Enter a Lname" />
      <input type="number" name="age" ref={age} placeholder="Enter an Age" />
      <button onClick={click}>Save First Name</button>
      <br />

      {/* Update Existing Data */}
      <input
        type="text"
        name="fname"
        placeholder="Enter a Fname"
        value={update.fname || ''}
        onChange={(e) => setUpdate({ ...update, fname: e.target.value })}
      />
      <input
        type="text"
        name="lname"
        placeholder="Enter a Lname"
        value={update.lname || ''}
        onChange={(e) => setUpdate({ ...update, lname: e.target.value })}
      />
      <input
        type="number"
        name="age"
        placeholder="Enter an Age"
        value={update.age || ''}
        onChange={(e) => setUpdate({ ...update, age: e.target.value })}
      />
      <button onClick={updateVal}>Update</button>

      {/* Display Data */}
      {ress.map((val, ind) => (
        <div key={ind}>
          <h2>{val.fname}</h2>
          <h2>{val.lname}</h2>
          <h2>{val.age}</h2>
          <button onClick={() => deleteData(ind)}>Delete</button>
          <button onClick={() => updateData(val, ind)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default App;
