import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './JobEditScreen.scss';

import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

import './JobEditScreen.scss';
import Loader from '../components/Loader';

export default function UserEditScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [website, setWebsite] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const [uploading, setUploading] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setImage(user.image);
        setLocation(user.location);
        setSummary(user.summary);
        setWebsite(user.website);
        setGithub(user.github);
        setLinkedin(user.linkedin);
      }
    }
  }, [dispatch, id, user, successUpdate, navigate]);

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

  const submitHandler = (e) => {
    e.preventDefault();

    // setMessageUpdated(true);
    dispatch(
      updateUser({
        _id: id,
        name,
        email,
        isAdmin,
        image,
        location,
        summary,
        website,
        github,
        linkedin,
      })
    );
  };

  return (
    <div className="job-edit">
      <div className="back-btn__container">
        <Link to="/admin/userlist" className="back-btn">
          Go Back
        </Link>
      </div>

      <div>
        <h1 className="list-title">Edit User</h1>
        {loadingUpdate ? <Loader /> : errorUpdate ? <p>{error}</p> : ''}
        {loading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <form
            action=""
            onSubmit={submitHandler}
            className="job-edit__form-container"
          >
            <div className="job-edit__form-items">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="isAdmin">Admin?</label>
              <input
                id="isAdmin"
                type="checkbox"
                value={isAdmin}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="image">Profile Image</label>
              <input
                id="image"
                type="file"
                placeholder="Choose File"
                onChange={uploadFileHandler}
              />
              {uploading && <p>Uploading...</p>}
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                placeholder="e.g. New York, United States"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="summary">Summary</label>
              <input
                id="summary"
                type="text"
                placeholder="Enter summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                placeholder="e.g. https://www.yoursite"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="github">Github URL</label>
              <input
                id="github"
                type="text"
                placeholder="e.g. https://github.com/username"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="linkedin">Summary</label>
              <input
                id="linkedin"
                type="text"
                placeholder="e.g. https://linkedin.com/username"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-signin">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
