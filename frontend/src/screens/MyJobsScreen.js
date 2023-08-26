import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { listMyApplications } from '../actions/applicationActions';
import { calculateDate } from '../utils/CalculateDate';

import './MyJobsScreen.scss';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function MyJobsScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const applicationListMy = useSelector((state) => state.applicationListMy);
  const {
    loading: loadingApplications,
    error: errorApplications,
    applications,
  } = applicationListMy;

  const showCloudinaryImage = (application) => {
    const cloudinaryImageUrl =
      application && application.jobListing.logo
        ? application.jobListing.logo
        : '';
    const ImageUrl = cloudinaryImageUrl.slice(1);
    return ImageUrl;
  };

  calculateDate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listMyApplications());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="myjobs__container">
      <h1 className="list-title">My Applications</h1>
      {loadingApplications ? (
        <Loader />
      ) : errorApplications ? (
        <p>{errorApplications}</p>
      ) : (
        <ul className="myjobs__list">
          {applications &&
            applications.map((application) => (
              <li key={application._id} className="myjobs__item">
                <div className="myjobs__inner-container">
                  <div className="myjobs__img-container">
                    <img
                      src={
                        application.jobListing.logo.startsWith('/images')
                          ? application.jobListing.logo
                          : showCloudinaryImage(application)
                      }
                      alt={application.jobListing.company}
                    />
                  </div>
                  <div>
                    <Message variant="danger">{application.status}</Message>
                    <Link
                      to={`/job/${application.jobListing.id}`}
                      className="myjobs__position"
                    >
                      {application.jobListing.position}
                    </Link>
                    <p>{application.jobListing.company}</p>
                    <p>{application.jobListing.location}</p>
                    <p className="myjobs__date">
                      Applied on {calculateDate(application.createdAt)}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/application/${application._id}`}
                  className="myjobs__details btn"
                >
                  View details
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
