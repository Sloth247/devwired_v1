import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message';
import Loader from '../components/Loader';
import { listJobDetails } from '../actions/jobActions';
import { listMyApplications } from '../actions/applicationActions';

import './JobDetailsScreen.scss';
import Message from '../components/Message';

const JobDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jobDetails = useSelector((state) => state.jobDetails);
  const { loading, error, job } = jobDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const applicationListMy = useSelector((state) => state.applicationListMy);
  const { applications } = applicationListMy;

  useEffect(() => {
    if (userInfo) {
      dispatch(listMyApplications());
    }
    dispatch(listJobDetails(id));
  }, [dispatch, id, userInfo]);

  const hasApplied =
    applications &&
    applications.some((application) => application.jobListing.id === id);

  const handleClick = () => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!hasApplied) {
      navigate(`/apply/${id}`);
    }
  };

  const formatSalary = (salary) => {
    return salary ? salary.toLocaleString() : '';
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="job-container">
          <div className="job__header">
            {hasApplied && (
              <Message variant="danger">
                You have already applied for this job!
              </Message>
            )}
            <div className="job__header-flex">
              <div className="job__logo-container">
                <img src={job.logo} alt={job.company} />
              </div>
              <h2 className="job__position">{job.position}</h2>
            </div>
            <div className="job__header-other">
              <h3 className="job__company">{job.company}</h3>
              <p>{job.location}</p>
              <p>
                ${formatSalary(job.salaryStart)} - $
                {formatSalary(job.salaryEnd)}
              </p>
              <p>{job.contract}</p>
              <div className="job__skills">
                <h4 className="job__skills-title">Skills</h4>
                <p className="job__skills-flex">
                  {job.languages.map((language, index) => (
                    <span className="job__skills-item" key={index}>
                      {language}
                    </span>
                  ))}
                  {job.tools.map((tool, index) => (
                    <span className="job__skills-item" key={index}>
                      {tool}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <div className="job__description">
            <h3 className="job__description-title">Job Description</h3>
            <article className="job__item">
              <h4 className="job__description-sub-title">Overview</h4>
              <p>{job.overview}</p>
            </article>
            <article className="job__item">
              <h4 className="job__description-sub-title">Responsibilities</h4>
              {job.responsibilities.map((responsibility, index) => (
                <p key={index}>
                  <span>&#x2022;</span> {responsibility}
                </p>
              ))}
            </article>
            <article className="job__item">
              <h4 className="job__description-sub-title">Qualifications</h4>
              {job.qualifications.map((qualification, index) => (
                <p key={index}>
                  <span>&#x2022;</span> {qualification}
                </p>
              ))}
            </article>
            <article className="job__item">
              <h4 className="job__description-sub-title">Salary Range</h4>
              <p>
                ${formatSalary(job.salaryStart)}/yr to $
                {formatSalary(job.salaryEnd)}/yr
              </p>
            </article>
            <article className="job__item">
              <h4 className="job__description-sub-title">Hours</h4>
              <p>{job.hours}</p>
            </article>
            <article className="job__item">
              <h4 className="job__description-sub-title">
                Benefits and Remarks
              </h4>
              <p>{job.remarks}</p>
            </article>
          </div>

          <button
            type="submit"
            className="btn btn-signin"
            onClick={handleClick}
            disabled={hasApplied}
          >
            {hasApplied ? 'Already Applied' : 'Apply Now'}
          </button>
        </div>
      )}
    </>
  );
};

export default JobDetailsScreen;
