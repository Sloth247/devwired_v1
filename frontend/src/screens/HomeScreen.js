import React from 'react';
import jobs from '../data';

const HomeScreen = () => {
  return (
    <div>
      {jobs.map((job) => (
        <p>{job.company}</p>
      ))}
    </div>
  );
};

export default HomeScreen;
