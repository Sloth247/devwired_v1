import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { createApplication } from '../actions/applicationActions';

import './LoginScreen.scss';
import { listJobDetails } from '../actions/jobActions';
import { APPLICATION_CREATE_RESET } from '../constants/applicationConstants';
import Loader from '../components/Loader';

export default function ApplyScreen() {
  const [resume, setResume] = useState('');
  const [coverletter, setCoverletter] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const jobDetails = useSelector((state) => state.jobDetails);
  const { loading: loadingDetails, error: errorDetails, job } = jobDetails;

  const applicationCreate = useSelector((state) => state.applicationCreate);
  const { application, success, error } = applicationCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behaivor: 'smooth' });
    if (success) {
      navigate(`/success/${application._id}`);
    } else if (!userInfo) {
      navigate('/login');
    } else if (!job.company || job._id !== id) {
      dispatch(listJobDetails(id));
    }

    dispatch({ type: APPLICATION_CREATE_RESET });
  }, [userInfo, navigate, job.company, id, job._id, dispatch, success]);

  const uploadResumeFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('resource_type', 'auto');
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);

      setResume(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadCoverFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);

      setCoverletter(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!resume) {
      setMessage('Please upload resume');
    } else if (!coverletter) {
      setMessage('Please upload coverletter');
    } else {
      dispatch(
        createApplication({
          jobListing: {
            id: id,
            company: job.company,
            location: job.location,
            logo: job.logo,
            position: job.position,
          },
          resume: resume,
          coverletter: coverletter,
        })
      );
    }
  };

  return (
    <div className="login-container">
      <h1 className="login__title">Application</h1>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form
        action=""
        onSubmit={submitHandler}
        className="login__form-container"
      >
        <div className="login__form-items">
          <label htmlFor="resume">Resume</label>
          <input
            id="resume"
            type="file"
            placeholder="Choose file"
            onChange={uploadResumeFileHandler}
          />
        </div>
        <div className="login__form-items">
          <label htmlFor="coverletter">Cover Letter</label>
          <input
            id="coverletter"
            type="file"
            placeholder="Choose file"
            onChange={uploadCoverFileHandler}
          />
        </div>
        <button type="submit" className="btn btn-signin">
          Apply
        </button>
      </form>

      <div className="job-container">
        {loadingDetails && <Loader />}
        {errorDetails && <p>{errorDetails}</p>}
        <div className="job__header">
          <h2 className="job__position">{job.position}</h2>
          <h3 className="job__company">{job.company}</h3>
        </div>

        <div className="job__description">
          <h3>Job Description</h3>
          <article className="job__item">
            <h4>Overview</h4>
            <p>{job.overview}</p>
          </article>
          <article className="job__item">
            <h4>Responsibilities</h4>
            {job.responsibilities.map((responsibility, index) => (
              <p key={index}>
                <span>&#x2022;</span> {responsibility}
              </p>
            ))}
          </article>
          <article className="job__item">
            <h4>Qualifications</h4>
            {job.qualifications.map((qualification, index) => (
              <p key={index}>
                <span>&#x2022;</span> {qualification}
              </p>
            ))}
          </article>
          <article className="job__item">
            <h4>Salary Range</h4>
            <p>
              {job.salaryStart}/yr to {job.salaryEnd}/yr
            </p>
          </article>
          <article className="job__item">
            <h4>Hours</h4>
            <p>{job.hours}</p>
          </article>
          <article className="job__item">
            <h4>Benefits and Remarks</h4>
            <p>{job.remarks}</p>
          </article>
        </div>
      </div>
    </div>
  );
}
