

// src/components/RecordManager.js
import React, { useState, useEffect } from 'react';
import './RecordManager.css';
const RecordManager = () => {
  const [records, setRecords] = useState([]);
  const [recordText, setRecordText] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);



  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('records')) || [];
    setRecords(storedRecords);
    if (selectedRecord !== null) {
      setRecordText(selectedRecord.text);
    }
  }, [selectedRecord]);

  const addOrUpdateRecord = () => {
    if (recordText.trim() === '') {
      return;
    }

    if (selectedRecord === null) {
      const newRecord = {
        id: Date.now(),
        text: recordText,
      
      };

      setRecords([...records, newRecord]);
      setRecordText('');
      localStorage.setItem('records', JSON.stringify([...records, newRecord]));
    } else {
      const updatedRecords = records.map((record) =>
        record.id === selectedRecord.id
          ? { ...record, text: recordText, }
          : record
      );

      setRecords(updatedRecords);
      setRecordText('');
      setSelectedRecord(null);
      localStorage.setItem('records', JSON.stringify(updatedRecords));
    }
  };

  const deleteRecord = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);

    setRecords(updatedRecords);
    setRecordText('');
    setSelectedRecord(null);
    localStorage.setItem('records', JSON.stringify(updatedRecords));
  };

  return (
    <div className="record-manager-container">
      <h1 className="record-manager-header">CRUD Operations with LocalStorage</h1>
      <div className="record-input-container">
        <input
          type="text"
          value={recordText}
          onChange={(e) => setRecordText(e.target.value)}
          placeholder="Enter a record"
          className="record-input"
        />
        <button onClick={addOrUpdateRecord} className="record-button">
          {selectedRecord === null ? 'Add' : 'Update'}
        </button>
      </div>
      <ul className="record-list">
        {records.map((record) => (
          <li key={record.id} className="record-item">
            <span className="record-text">{record.text}</span>
            <button onClick={() => setSelectedRecord(record)} className="record-action-button">
              Update
            </button>
            <button onClick={() => deleteRecord(record.id)} className="record-action-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordManager;