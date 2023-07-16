import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { listApplications } from '../actions/applicationActions';

const ApplicationListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applicationList = useSelector((state) => state.applicationList);
  const { loading, error, applications } = applicationList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listApplications());
      console.log(applications);
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <h1>Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>COMPANY</th>
              <th>POSITION</th>
              <th>RESUME</th>
              <th>COVERLETTER</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applications &&
              applications.map((application) => (
                <tr key={application._id}>
                  <td>{application._id}</td>
                  <td>{application.user && application.user.name}</td>
                  <td>{application.createdAt.substring(0, 10)}</td>
                  <td>${application.jobListing.company}</td>
                  <td>{application.jobListing.position}</td>
                  <td>{application.resume}</td>
                  <td>{application.coverletter}</td>
                  <td>{application.status}</td>
                  <td>
                    <Link to={`/application/${application._id}`}>
                      <button className="btn-sm">Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ApplicationListScreen;
