import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';

import { listJobs, deleteJob, createJob } from '../actions/jobActions';
import { JOB_CREATE_RESET } from '../constants/jobConstants';

export default function JobListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();

  const jobList = useSelector((state) => state.jobList);
  const { loading, error, jobs, pages, page } = jobList;

  const jobDelete = useSelector((state) => state.jobDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = jobDelete;

  const jobCreate = useSelector((state) => state.jobCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    job: createdJob,
  } = jobCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: JOB_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
    if (successCreate && createdJob) {
      navigate(`/admin/job/${createdJob._id}/edit`);
    } else {
      if (param) {
        dispatch(listJobs(param));
      } else {
        dispatch(listJobs());
      }
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdJob]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteJob(id));
    }
  };

  const createJobHandler = (job) => {
    dispatch(createJob());
  };

  return (
    <>
      <div>
        <h1>List of job listings</h1>

        <button onClick={createJobHandler}>Create Job</button>
      </div>
      {loadingDelete && <p>Loading...</p>}
      {errorDelete && <p>{errorDelete}</p>}
      {loadingCreate && <p>Loading...</p>}
      {errorCreate && <p>{errorCreate}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>company</th>
              <th>logo</th>
              <th>New</th>
              <th>featured</th>
              <th>position</th>
              <th>role</th>
              <th>level</th>
              <th>contract</th>
              <th>location</th>
              <th>language</th>
              <th>tools</th>
              <th>overview</th>
              <th>qualifications</th>
              <th>salary start</th>
              <th>salary end</th>
              <th>hours</th>
              <th>responsibilities</th>
              <th>remarks</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(jobs) &&
              jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job._id}</td>
                  <td>{job.company}</td>
                  <td>${job.logo}</td>
                  <td>{job.isNew ? 'y' : ''}</td>
                  <td>{job.featured ? 'y' : ''}</td>
                  <td>{job.position}</td>
                  <td>{job.role}</td>
                  <td>{job.level}</td>
                  <td>{job.contract}</td>
                  <td>{job.location}</td>
                  <td>{job.languages.map((language) => language)}</td>
                  <td>{job.tools.map((tool) => tool)}</td>
                  <td>{job.overview}</td>
                  <td>
                    {job.qualifications.map((qualification) => qualification)}
                  </td>
                  <td>{job.salaryStart}</td>
                  <td>{job.salaryEnd}</td>
                  <td>{job.hours}</td>
                  <td>{job.responsibilities}</td>
                  <td>{job.remarks}</td>

                  <td>
                    <Link to={`/admin/job/${job._id}/edit`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => deleteHandler(job._id)}>
                      delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Paginate pages={pages} page={page} isAdmin={true} />
    </>
  );
}
