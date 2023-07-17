import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import { RiDeleteBinFill, RiEdit2Fill } from 'react-icons/ri';
import { listUsers, deleteUser } from '../actions/userActions';

import Table from 'react-bootstrap/Table';

import './UserListScreen.scss';
import Loader from '../components/Loader';

export default function UserListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1 className="list-title">Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table responsive="sm" striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>LOCATION</th>
              <th>SUMMARY</th>
              <th>WEBSITE</th>
              <th>GITHUB</th>
              <th>LINKEDIN</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.location}</td>
                  <td>{user.summary}</td>
                  <td>
                    <a href={user.website}>{user.website}</a>
                  </td>
                  <td>
                    <a href={user.github}>{user.github}</a>
                  </td>
                  <td>
                    <a href={user.github}>{user.linkedin}</a>
                  </td>
                  <td>
                    <a href={user.github}>{user.isAdmin ? <BsCheck /> : ''}</a>
                  </td>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button className="btn-edit">
                        <RiEdit2Fill className="edit-icon" />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="btn-delete"
                    >
                      <RiDeleteBinFill className="delete-icon" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
