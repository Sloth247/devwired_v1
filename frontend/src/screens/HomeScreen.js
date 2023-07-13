import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { listJobs } from '../actions/jobActions';
// import jobs from '../data';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const jobList = useSelector((state) => state.jobList);
  const { loading, error, jobs, page, pages } = jobList;

  useEffect(() => {
    dispatch(listJobs());
  }, [dispatch]);

  return (
    <div>{Array.isArray(jobs) && jobs.map((job) => <p>{job.company}</p>)}</div>
  );
};

export default HomeScreen;
