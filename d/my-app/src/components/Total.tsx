import React from 'react';

import { CoursePart } from '../types';

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      <p>
        <b>
          Number of exercises{' '}
          {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </b>
      </p>
    </div>
  );
};

export default Total;
