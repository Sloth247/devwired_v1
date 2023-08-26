import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getUserDetails } from '../actions/userActions';
import { AiFillCheckCircle } from 'react-icons/ai';
import './ApplySuccessScreen.scss';
import Loader from '../components/Loader';

export default function ApplySuccessScreen() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingDetails, error: errorDetails, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (!user || !user.name) {
      dispatch(getUserDetails('profile'));
    } else {
      setEmail(user.email);
    }
  }, [userInfo, navigate, dispatch, user]);

  return (
    <div className="success-container">
      <div className="img-container">
        <AiFillCheckCircle className="check-mark" />
      </div>
      <h1 className="success__title">Your application has been submitted!</h1>
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <p>{errorDetails}</p>
      ) : (
        <p className="success__message">
          You will get an email confirmation at{' '}
          <span className="success__message-email">{email}</span>
        </p>
      )}
      <div className="success__btn-container">
        <Link
          to={`/application/${id}`}
          className="success__details-btn success-btn"
        >
          See the application details
        </Link>
        <Link to="/" className="success__other-btn success-btn">
          Search Other Jobs
        </Link>
      </div>
    </div>
  );
}
