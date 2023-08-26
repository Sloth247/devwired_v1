import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { listJobDetails, updateJob } from '../actions/jobActions';
import { JOB_UPDATE_RESET } from '../constants/jobConstants';
import Loader from '../components/Loader';
import './JobEditScreen.scss';

const JobEditScreen = () => {
  const [company, setCompany] = useState('');
  const [logo, setLogo] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');
  const [contract, setContract] = useState('');
  const [location, setLocation] = useState('');
  const [languages, setLanguages] = useState('');
  const [tools, setTools] = useState(['']);
  const [overview, setOverview] = useState('');
  const [qualifications, setQualifications] = useState(['']);
  const [salaryStart, setSalaryStart] = useState(0);
  const [salaryEnd, setSalaryEnd] = useState(0);
  const [hours, setHours] = useState('');
  const [responsibilities, setResponsibilities] = useState(['']);
  const [remarks, setRemarks] = useState(['']);

  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const jobDetails = useSelector((state) => state.jobDetails);
  const { loading, error, job } = jobDetails;

  const jobUpdate = useSelector((state) => state.jobUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = jobUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: JOB_UPDATE_RESET });
      navigate('/admin/joblist');
    } else {
      if (!job.company || job._id !== id) {
        dispatch(listJobDetails(id));
      } else {
        setCompany(job.company);
        setLogo(job.logo);
        setIsNew(job.isNew);
        setFeatured(job.featured);
        setPosition(job.position);
        setRole(job.role);
        setLevel(job.level);
        setContract(job.contract);
        setLocation(job.location);
        setLanguages(job.languages);
        setTools(job.tools);
        setOverview(job.overview);
        setQualifications(job.qualifications);
        setSalaryStart(job.salaryStart);
        setSalaryEnd(job.salaryEnd);
        setHours(job.hours);
        setResponsibilities(job.responsibilities);
        setRemarks(job.remarks);
      }
    }
  }, [job, id, dispatch, navigate, successUpdate]);

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

      setLogo(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const languagesArray =
      typeof languages === 'string'
        ? languages.split(',').map((language) => language.trim())
        : [];
    const toolsArray =
      typeof tools === 'string'
        ? tools.split(',').map((tool) => tool.trim())
        : [];
    const qualificationsArray =
      typeof qualifications === 'string'
        ? qualifications.split(',').map((qualification) => qualification.trim())
        : [];

    dispatch(
      updateJob({
        _id: id,
        company,
        logo,
        isNew,
        featured,
        position,
        role,
        level,
        contract,
        location,
        languages: languagesArray,
        tools: toolsArray,
        overview,
        qualifications: qualificationsArray,
        salaryStart,
        salaryEnd,
        hours,
        responsibilities,
        remarks,
      })
    );
  };

  return (
    <div className="job-edit">
      <div className="back-btn__container">
        <Link to="/admin/joblist" className="back-btn btn">
          Go Back
        </Link>
      </div>

      <div>
        <h1 className="list-title">Edit Job Listing</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <p>{errorUpdate}</p>}
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
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="company"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="logo">Logo</label>
              <input
                id="logo"
                type="logo"
                placeholder="Enter logo url"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
              <input
                type="file"
                label="Choose File"
                custom="true"
                onChange={uploadFileHandler}
              />
              {uploading && <p>Uploading...</p>}
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="isNew">New?</label>
              <input
                id="isNew"
                type="checkbox"
                value={isNew}
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
              />
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="featured">Featured?</label>
              <input
                id="featured"
                type="checkbox"
                value={featured}
                checked={featured}
                onChange={(e) => setFeatured(e.target.value)}
              />
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="position">position</label>
              <input
                id="position"
                type="text"
                placeholder="Enter position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="role-select">Choose a role</label>
              <select
                name="role"
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Frontend">Frontend</option>
                <option value="Fullstack">Fullstack</option>
                <option value="Backend">Backend</option>
              </select>
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="level-select">Choose a level</label>
              <select
                name="level"
                id="level-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Junior">Junior</option>
                <option value="Midweight">Midweight</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <div className="job-edit__form-items">
              <label htmlFor="contract-select">Choose a contract</label>
              <select
                name="contract"
                id="contract-select"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="location">location</label>
              <input
                id="location"
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="languages">languages</label>
              <textarea
                id="languages"
                type="text"
                placeholder="Enter languages separated by commas (e.g. JavaScript, C++)"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
              ></textarea>
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="tools">tools</label>
              <textarea
                id="tools"
                type="text"
                placeholder="Enter tools separated by commas (e.g. React, Ruby)"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
              ></textarea>
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="overview">overview</label>
              <textarea
                id="overview"
                type="text"
                placeholder="Enter overview"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              ></textarea>
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="qualifications">qualifications</label>
              <textarea
                id="qualifications"
                type="text"
                placeholder="Enter qualifications separated by commas"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
              ></textarea>
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="salary-start">Salary start</label>
              <input
                id="salary-start"
                type="number"
                value={salaryStart}
                onChange={(e) => setSalaryStart(e.target.value)}
              />
              <label htmlFor="salary-end">Salary End</label>
              <input
                id="salary-end"
                type="number"
                value={salaryEnd}
                onChange={(e) => setSalaryEnd(e.target.value)}
              />
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="hours">Hours</label>
              <input
                id="hours"
                type="text"
                placeholder="Enter hours (e.g. 8am-5pm)"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="responsibilities">Responsibilities</label>
              <textarea
                id="responsibilities"
                type="text"
                placeholder="Enter responsibilities separated by commas"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
              ></textarea>
            </div>

            <div className="job-edit__form-items">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                id="remarks"
                type="text"
                placeholder="Enter remarks separated by commas"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobEditScreen;
