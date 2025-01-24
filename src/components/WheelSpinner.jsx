import React, { useState, useEffect } from 'react';
import WheelComponent from 'react-wheel-of-prizes';

const WheelSpinner = () => {
  const [segments, setSegments] = useState([]);
  const [newSegment, setNewSegment] = useState('');
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [segments]);

  const addSegment = () => {
    if (newSegment.trim()) {
      setSegments([...segments, newSegment.trim()]);
      setNewSegment('');
    }
  };

  const removeSegment = (index) => {
    setSegments(segments.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <input
          value={newSegment}
          onChange={(e) => setNewSegment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSegment()}
          className="w-full p-2 border rounded"
          placeholder="Add new segment"
        />
        <button onClick={addSegment} className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Segment
        </button>
      </div>

      <div className="mb-4 max-h-40 overflow-y-auto">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded mb-2">
            <span>{segment}</span>
            <button onClick={() => removeSegment(index)} className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        ))}
      </div>

      {segments.length > 0 && (
        <div key={key}>
          <WheelComponent
            segments={segments}
            segColors={['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F']}
            onFinished={(winner) => alert(`Winner: ${winner}`)}
            primaryColor="black"
            contrastColor="white"
            buttonText="SPIN"
            isOnlyOnce={false}
            size={290}
            upDuration={100}
            downDuration={1000}
          />
        </div>
      )}
    </div>
  );
};

export default WheelSpinner;