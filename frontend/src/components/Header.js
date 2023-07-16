import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';
import { HiUserCircle } from 'react-icons/hi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { logout } from '../actions/userActions';
import './Header.scss';

export default function Header() {
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
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
    setIsShown(false);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [location.pathname]);

  return (
    <header className="header">
      <h1 className="header__logo">
        <Link to="/">DevWired</Link>
      </h1>
      {!userInfo && (
        <Link to="/login" className="header__login">
          <HiUserCircle />
          <span className="header__login-text">login</span>
        </Link>
      )}
      {userInfo && !userInfo.isAdmin && (
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
            {userInfo.name}
            {isShown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          <ul className={!isShown ? 'dropdown hide' : 'dropdown'} id="dropdown">
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
          <ul className={!isShown ? 'dropdown hide' : 'dropdown'} id="dropdown">
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
    </header>
  );
}
