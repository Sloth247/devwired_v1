import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import JobListScreen from './screens/JobListScreen';
import JobEditScreen from './screens/JobEditScreen';
import ApplyScreen from './screens/ApplyScreen';
import ApplySuccessScreen from './screens/ApplySuccessScreen';
import ApplicationDetailsScreen from './screens/ApplicationDetailsScreen';
import ApplicationListScreen from './screens/ApplicationListScreen';
import MyJobsScreen from './screens/MyJobsScreen';
import Header from './components/Header';

const HomeScreen = lazy(() => import('./screens/HomeScreen'));

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
          <div className="main__inner">
            <Routes>
              <Route element={<HomeScreen />} path="/" />
              <Route element={<JobDetailsScreen />} path="/job/:id" />
              <Route
                element={<JobListScreen />}
                path="/admin/joblist/:pageNumber"
              />
              <Route element={<JobListScreen />} path="/admin/joblist" />

              <Route element={<JobEditScreen />} path="/admin/job/:id/edit" />
              <Route element={<LoginScreen />} path="/login" />
              <Route element={<RegisterScreen />} path="/register" />
              <Route element={<ProfileScreen />} path="/profile" />
              <Route element={<UserListScreen />} path="/admin/userlist" />
              <Route element={<UserEditScreen />} path="/admin/user/:id/edit" />
              <Route element={<ApplyScreen />} path="/apply/:id" />
              <Route element={<ApplySuccessScreen />} path="/success/:id" />
              <Route
                element={<ApplicationListScreen />}
                path="/admin/applicationlist"
              />
              <Route
                element={<ApplicationDetailsScreen />}
                path="/application/:id"
              />
              <Route element={<MyJobsScreen />} path="/myjobs" />
            </Routes>
          </div>
        </main>
        <footer className="footer"></footer>
      </div>
    </Router>
  );
}

export default App;
