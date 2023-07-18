import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { getUserDetails } from '../actions/userActions';

import { HiUserCircle } from 'react-icons/hi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import './Header.scss';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function Header() {
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const location = useLocation();
  const dropdownRef = useRef(null);

  const logoutHandler = () => {
    dispatch(logout());
    setIsShown(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsShown(false);
    }
  };

  useEffect(() => {
    if (userInfo && (!user || !user.name)) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails('profile'));
    }
    setIsShown(false);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [location.pathname, dispatch]);

  const cloudinaryImageUrl = user && user.image ? user.image.slice(1) : '';

  return (
    <header className="header">
      <div className="header__inner-container">
        <h1 className="header__logo">
          <Link to="/">DevWired</Link>
        </h1>
        {!userInfo && (
          <Link to="/login" className="header__login">
            <HiUserCircle />
            <span className="header__login-text">Login</span>
          </Link>
        )}
        {userInfo && !userInfo.isAdmin && user && (
          <div className="dropdown-container" ref={dropdownRef}>
            <button
              className="header__user-name"
              onClick={() => {
                setIsShown((prevState) => !prevState);
              }}
              aria-expanded={isShown ? true : false}
              aria-controls="dropdown"
            >
              {!user.image ? (
                <HiUserCircle className="header__user-icon" alt={user.name} />
              ) : (
                <div className="header__img-container">
                  <img
                    src={
                      user.image.includes('cloudinary')
                        ? cloudinaryImageUrl
                        : user.image
                    }
                    alt={user.name}
                  />
                </div>
              )}
              <span>{userInfo.name}</span>
              {isShown ? (
                <MdKeyboardArrowUp className="header__arrow" />
              ) : (
                <MdKeyboardArrowDown className="header__arrow" />
              )}
            </button>
            <ul
              className={!isShown ? 'dropdown hide' : 'dropdown'}
              id="dropdown"
            >
              <li className="dropdown-item">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="dropdown-item">
                <Link to="/myjobs">My jobs</Link>
              </li>
              <li className="dropdown-item">
                <button onClick={logoutHandler} className="btn-logout">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}{' '}
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown-container" ref={dropdownRef}>
            <button
              className="header__user-name"
              onClick={() => {
                setIsShown((prevState) => !prevState);
              }}
              aria-expanded={isShown ? true : false}
              aria-controls="dropdown"
            >
              <HiUserCircle className="header__user-icon" />
              <span>Admin</span>
              {isShown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
            <ul
              className={!isShown ? 'dropdown hide' : 'dropdown'}
              id="dropdown"
            >
              <li className="dropdown-item">
                <Link to="/admin/userlist">Users</Link>
              </li>
              <li className="dropdown-item">
                <Link to="/admin/joblist">Job Listing</Link>
              </li>
              <li className="dropdown-item">
                <Link to="/admin/applicationlist">Applications</Link>
              </li>
              <li className="dropdown-item">
                <button onClick={logoutHandler} className="btn-logout">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
