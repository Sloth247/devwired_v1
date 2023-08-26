import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';
import { RiDeleteBinFill, RiEdit2Fill } from 'react-icons/ri';

import { listJobs, deleteJob, createJob } from '../actions/jobActions';
import { JOB_CREATE_RESET } from '../constants/jobConstants';

import Table from 'react-bootstrap/Table';

import './JobListScreen.scss';
import Loader from '../components/Loader';

export default function JobListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useParams();

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
    if (successCreate && createdJob && createdJob._id) {
      navigate(`/admin/job/${createdJob._id}/edit`);
      console.log(createdJob._id);
    } else {
      dispatch(listJobs(pageNumber));
      console.log(pageNumber);
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdJob,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteJob(id));
    }
  };

  const createJobHandler = (job) => {
    dispatch(createJob());
    console.log(createdJob);
  };

  const formatSalary = (salary) => {
    return salary ? salary.toLocaleString() : '';
  };

  return (
    <>
      <div>
        <h1 className="list-title">List of job listings</h1>

        <button onClick={createJobHandler} className="btn-create btn">
          Create a new listing
        </button>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <p>{errorDelete}</p>}
      {loadingCreate && <p>Loading...</p>}
      {errorCreate && <p>{errorCreate}</p>}
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table responsive="sm" striped bordered={+true}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Logo</th>
              <th>New</th>
              <th>Featured</th>
              <th>Position</th>
              <th>Role</th>
              <th>Level</th>
              <th>Contract</th>
              <th>Location</th>
              <th>Languages</th>
              <th>Tools</th>
              <th>Overview</th>
              <th>Qualifications</th>
              <th>Salary start</th>
              <th>Salary end</th>
              <th>Hours</th>
              <th>Responsibilities</th>
              <th>Remarks</th>

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
                  <td>{formatSalary(job.salaryStart)}</td>
                  <td>{formatSalary(job.salaryEnd)}</td>
                  <td>{job.hours}</td>
                  <td>{job.responsibilities}</td>
                  <td>{job.remarks}</td>

                  <td>
                    <Link to={`/admin/job/${job._id}/edit`}>
                      <button className="btn-edit">
                        <RiEdit2Fill className="edit-icon" />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteHandler(job._id)}
                      className="btn-delete"
                    >
                      <RiDeleteBinFill className="delete-icon" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      <Paginate pages={pages} page={page} isAdmin={true} />
    </>
  );
}
