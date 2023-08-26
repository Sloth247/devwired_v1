import React, { useEffect, useState } from 'react';
import './ApplicationDetailsScreen.scss';
import { useParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
  getApplicationDetails,
  updateApplicationStatus,
} from '../actions/applicationActions';

import { calculateDate } from '../utils/CalculateDate';
import { getUserDetails } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { APPLICATION_DETAILS_RESET } from '../constants/applicationConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ApplicationDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingUser, error: errorUser, user } = userDetails;

  const applicationDetails = useSelector((state) => state.applicationDetails);
  const { application, loading, error } = applicationDetails;

  const [status, setStatus] = useState(application ? application.status : '');
  const [messageUpdated, setMessageUpdated] = useState(false);

  const cloudinaryResumeUrl =
    application && application.resume ? application.resume : '';
  const resumeUrl = cloudinaryResumeUrl.slice(1);

  const cloudinaryCoverletterUrl =
    application && application.coverletter ? application.coverletter : '';
  const coverletterUrl = cloudinaryCoverletterUrl.slice(1);

  const formattedCreatedAt =
    application && calculateDate(application.createdAt);

  useEffect(() => {
    if (application) {
      setStatus(application.status);

      if (application.user && user.isAdmin) {
        dispatch({ type: APPLICATION_DETAILS_RESET });
        dispatch({ type: USER_DETAILS_RESET });
        dispatch(getUserDetails(application.user));
      }
      console.log(application.user.name);
    } else if (!userInfo) {
      navigate('/login');
    } else if ((!user || !user.name) && !user.isAdmin) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails('profile'));
    } else {
      dispatch(getApplicationDetails(id));
    }
  }, [application, dispatch, id, user, userInfo, navigate]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    dispatch(updateApplicationStatus(id, status));
    setMessageUpdated(true);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="application-details">
      <div className="application-details__overview">
        <p className="application-details__position">
          {application.jobListing.position}
        </p>
        <p>{application.jobListing.company}</p>
        <p>{application.jobListing.location}</p>
        <p className="application-details__date">
          Applied on {formattedCreatedAt}
        </p>
      </div>

      <div className="application-details__details">
        <h1 className="application-details__title">Application details</h1>

        {messageUpdated && <Message variant="success">Status Updated!</Message>}
        {loadingUser ? (
          <Loader />
        ) : errorUser ? (
          <Message variant="danger">{errorUser}</Message>
        ) : (
          <>
            <div className="application-details__item">
              <h3 className="application-details__details-heading">
                Contact information
              </h3>
              <div className="application-details__container">
                <div className="application-details__contact-item">
                  <div className="application-details__contact-container">
                    <h4 className="application-details__contact-title">
                      Full Name
                    </h4>
                    <p>{user.isAdmin ? application.user.name : user.name}</p>
                  </div>
                </div>
                <div className="application-details__contact-item">
                  <div className="application-details__contact-container">
                    <h4 className="application-details__contact-title">
                      Email Address
                    </h4>
                    <p>{user.isAdmin ? application.user.email : user.email}</p>
                  </div>
                </div>
                <div className="application-details__contact-item">
                  <div className="application-details__contact-container">
                    <h4 className="application-details__contact-title">
                      Location
                    </h4>
                    <p>
                      {user.isAdmin
                        ? application.user.location
                        : user.location || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="application-details__contact-item">
                  <div className="application-details__contact-container">
                    <h4 className="application-details__contact-title">
                      Phone Number
                    </h4>
                    <p>
                      {user.isAdmin
                        ? application.user.phone
                        : user.phone || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="application-details__item">
              <h3 className="application-details__details-heading">Resume</h3>
              <div className="application-details__resume">
                <a href={resumeUrl} download>
                  View Resume
                </a>
              </div>
            </div>

            <div className="application-details__item">
              <h3 className="application-details__details-heading">
                Supporting documents
              </h3>

              <div className="application-details__coverletter">
                <a href={coverletterUrl} download>
                  View Coverletter
                </a>
              </div>
            </div>

            <form
              onSubmit={handleStatusSubmit}
              className="applicaiton-details__status"
            >
              <div className="application-details__status-container">
                <label
                  htmlFor="status"
                  className="application-details__details-heading"
                >
                  Status
                </label>
                <div className="application-details__select">
                  <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <option value="Application sent">Application sent</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer recieved">Offer recieved</option>
                    <option value="Hired">Hired</option>
                    <option value="Declined">Declined</option>
                    <option value="Not selected by employer">
                      Not selected by employer
                    </option>
                  </select>
                  <span className="focus"></span>
                </div>
              </div>
              <button
                type="submit"
                className="application-details__status-btn btn"
              >
                Update Status
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetailsScreen;
