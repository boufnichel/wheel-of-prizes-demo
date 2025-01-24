import React, { useState, useEffect } from 'react';
import { PlusCircle, X, RotateCw } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Panel - List Management */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Wheel Items</h2>
          
          <div className="space-y-6">
            {/* Add new item */}
            <div className="relative">
              <input
                value={newSegment}
                onChange={(e) => setNewSegment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSegment()}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter new item"
              />
              <button
                onClick={addSegment}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700"
                title="Add item"
              >
                <PlusCircle size={24} />
              </button>
            </div>

            {/* Items list */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-700">{segment}</span>
                  <button
                    onClick={() => removeSegment(index)}
                    className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove item"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              
              {segments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <RotateCw size={32} className="mx-auto mb-2 opacity-50" />
                  <p>Add items to start spinning the wheel</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Wheel */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center min-h-[500px]">
          {segments.length > 0 ? (
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
          ) : (
            <div className="text-center text-gray-500">
              <RotateCw size={48} className="mx-auto mb-3 opacity-50" />
              <p className="text-lg">Wheel will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WheelSpinner;