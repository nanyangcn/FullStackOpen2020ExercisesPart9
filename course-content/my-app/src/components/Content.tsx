import React from 'react';

import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  courseParts.forEach((part) => {
    switch (part.name) {
      case 'Fundamentals':
        break;
      case 'Using props to pass data':
        break;
      case 'Deeper type usage':
        break;
      case 'Course part four':
        break;
      default:
        return assertNever(part);
    }
  });

  return (
    <div>
      {courseParts.map((part) => {
        return (
          <div key={part.name}>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </p>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};

export default Content;
