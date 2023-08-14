import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { login } from '../actions/userActions';
import Message from '../components/Message';

import './LoginScreen.scss';
import Loader from '../components/Loader';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShown, setIsShown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-container">
      <h1 className="login__title">Sign In</h1>
      <p className="login__navigation">
        Don't have an account yet?{'  '}
        <Link
          to={redirect ? `/register?redirect=${redirect}` : '/register'}
          className="login__navigation-link"
        >
          Sign Up
        </Link>
      </p>
      <p>
        This is a demo website for job search using the MERN stack. To try out
        the admin account, please log in with the following credentials: email:
        'admin@example.com' password: '123456'.
      </p>
      <p>
        To try out the customer account, please either create your account or
        log in with the following credentials: email: 'john@example.com'
        password: '123456'.
      </p>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <form
        action=""
        onSubmit={submitHandler}
        className="login__form-container"
      >
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
              <BiShow aria-labelledby="show password" />
            ) : (
              <BiHide aria-labelledby="hide password" />
            )}
          </button>
        </div>
        <button type="submit" className="btn btn-signin">
          Sign In
        </button>
      </form>
    </div>
  );
}
