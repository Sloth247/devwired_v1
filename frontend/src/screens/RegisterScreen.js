import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { register } from '../actions/userActions';

import './LoginScreen.scss';
import Loader from '../components/Loader';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isShown, setIsShown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setMessage('All fields are required!');
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="login-container">
      <h1 className="login__title">Sign Up</h1>
      {loading && <Loader />}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form
        action=""
        onSubmit={submitHandler}
        className="login__form-container"
      >
        <div className="login__form-items">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="login__form-items">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__form-items">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={isShown ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn-showhide"
            onClick={() => setIsShown((prevState) => !prevState)}
          >
            {isShown ? (
              <BiHide aria-labelledby="hide password" />
            ) : (
              <BiShow aria-labelledby="show password" />
            )}
          </button>
        </div>
        <div className="login__form-items">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type={isShown ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="btn-showhide"
            onClick={() => setIsShown((prevState) => !prevState)}
          >
            {isShown ? (
              <BiHide aria-labelledby="hide password" />
            ) : (
              <BiShow aria-labelledby="show password" />
            )}
          </button>
        </div>
        <button type="submit" className="btn btn-signin">
          Register
        </button>
      </form>
    </div>
  );
}
