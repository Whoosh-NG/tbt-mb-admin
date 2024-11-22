import React from 'react';

interface ProgressBarProps {
  progress: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <div className='w-full bg-gray-200 rounded-lg overflow-hidden'>
      <div
        className={`h-2 transition-all duration-300`}
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
  );
};

export default ProgressBar;
