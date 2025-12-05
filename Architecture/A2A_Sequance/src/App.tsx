import React, { useState } from 'react';
import { SequenceDiagram } from './components/SequenceDiagram';

export default function App() {
  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center p-8">
      <SequenceDiagram />
    </div>
  );
}
