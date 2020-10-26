import React from 'react';

import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      <p>{JSON.stringify(part, null, ' ')}</p>
    </div>
  );
};

export default Part;
