import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

import Loader from '../components/Loader';
import Message from '../components/Message';
import './ProfileScreen.scss';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [website, setWebsite] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [message, setMessage] = useState(null);
  const [messageUpdated, setMessageUpdated] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isConfirmedShown, setIsConfirmedShown] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setImage(user.image);
        setLocation(user.location);
        setSummary(user.summary);
        setWebsite(user.website);
        setGithub(user.github);
        setLinkedin(user.linkedin);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessageUpdated(true);
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          phoneNumber,
          image,
          location,
          summary,
          website,
          github,
          linkedin,
        })
      );
    }
  };

  const uploadFileHandler = async (e) => {
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

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <div className="profile-container">
        <h2 className="list-title">User Profile</h2>
        {loading && <Loader />}
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
        {messageUpdated && (
          <Message variant="success">Profile Updated!</Message>
        )}
        <form
          action=""
          onSubmit={submitHandler}
          className="profile__form-container"
        >
          <div className="profile__form-items">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="profile__form-items">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="profile__form-items">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={isShown ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn-showhide"
              onClick={() => setIsShown((prevState) => !prevState)}
            >
              {isShown ? (
                <BiShow aria-labelledby="show password" />
              ) : (
                <BiHide aria-labelledby="hide password" />
              )}
            </button>
          </div>
          <div className="profile__form-items">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={isConfirmedShown ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="btn-showhide"
              onClick={() => setIsConfirmedShown((prevState) => !prevState)}
            >
              {isConfirmedShown ? (
                <BiShow aria-labelledby="show password" />
              ) : (
                <BiHide aria-labelledby="hide password" />
              )}
            </button>
          </div>
          <div className="profile__form-items">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="profile__form-items">
            <label htmlFor="image">Profile Image</label>
            <input
              id="image"
              type="file"
              placeholder="Choose File"
              onChange={uploadFileHandler}
            />
            {uploading && <p>Loading...</p>}
          </div>
          <div className="profile__form-items">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="e.g. New York, United States"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="profile__form-items">
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              type="text"
              placeholder="Enter summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={10}
            />
          </div>
          <div className="profile__form-items">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              placeholder="e.g. https://www.yoursite"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="profile__form-items">
            <label htmlFor="github">Github URL</label>
            <input
              id="github"
              type="text"
              placeholder="e.g. https://github.com/username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div className="profile__form-items">
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input
              id="linkedin"
              type="text"
              placeholder="e.g. https://linkedin.com/username"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-update">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
}
