import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Filterbar from '../components/Filterbar';
import Paginate from '../components/Paginate';
import { listJobs } from '../actions/jobActions';
import { calculateDate } from '../utils/CalculateDate';

import './HomeScreen.scss';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const jobList = useSelector((state) => state.jobList);
  const { loading, error, jobs, page, pages } = jobList;

  let [searchParams, setSearchParams] = useSearchParams();

  const params = [];

  searchParams.forEach((value, key) => {
    params.push([key, value]);
  });

  const queryParams = new URLSearchParams(params);

  useEffect(() => {
    if (queryParams) {
      dispatch(listJobs(queryParams));
    } else {
      dispatch(listJobs());
    }
    // eslint-disable-next-line
  }, [dispatch, searchParams]);

  const addQuery = (key, value) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.delete('pageNumber');
      newSearchParams.append(key, value);
      return newSearchParams;
    });
  };

  const deleteQuery = (idx) => {
    const keyArray = Array.from(queryParams.keys());
    const key = keyArray[idx];
    queryParams.delete(`${key}`);
    setSearchParams(queryParams);
  };

  const deleteAllQueries = () => {
    searchParams = [];
    setSearchParams(searchParams);
  };

  return (
    <div className="home__inner-container">
      {queryParams && (
        <Filterbar
          queryParams={queryParams}
          deleteQuery={deleteQuery}
          deleteAllQueries={deleteAllQueries}
        />
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {Array.isArray(jobs) &&
            jobs.map((job) => (
              <li
                className={job.featured ? 'post featured' : 'post'}
                key={job._id}
              >
                <div className="post__grid">
                  <div className="post__img-container">
                    <LazyLoadImage
                      src={
                        job.logo.includes('cloudinary')
                          ? job.logo.slice(1)
                          : job.logo
                      }
                      alt={job.company}
                      width={48}
                      height={48}
                    />
                  </div>

                  <div className="post__upper-container">
                    <div className="post__company-container">
                      <h2 className="post__company">{job.company}</h2>
                      {job.isNew && (
                        <span className="post__label new">new!</span>
                      )}
                      {job.featured && (
                        <span className="post__label featured">featured</span>
                      )}
                    </div>
                    <Link to={`/job/${job._id}`}>
                      <h3 className="post__job-title">{job.position}</h3>
                    </Link>
                    <div className="post__data">
                      <span className="post__date">
                        {job.postedAt
                          ? job.postedAt
                          : calculateDate(job.createdAt)}
                      </span>
                      <div className="post__dot"></div>
                      <span className="post__hours">{job.contract}</span>
                      <div className="post__dot"></div>
                      <span className="post__location">{job.location}</span>
                    </div>
                  </div>

                  <div className="post__lower-container">
                    <button
                      className="post__category"
                      name="role"
                      value={job.role}
                      onClick={(e) => addQuery('role', e.currentTarget.value)}
                    >
                      <span>{job.role}</span>
                    </button>{' '}
                    <button
                      className="post__category"
                      value={job.level}
                      onClick={(e) => addQuery('level', e.currentTarget.value)}
                    >
                      <span>{job.level}</span>
                    </button>
                    {job.languages.map((language, index) => (
                      <button
                        className="post__category"
                        name="language"
                        value={language}
                        onClick={(e) =>
                          addQuery('languages', e.currentTarget.value)
                        }
                        key={index}
                      >
                        <span>{language}</span>
                      </button>
                    ))}
                    {job.tools.map((tool, index) => (
                      <button
                        className="post__category"
                        name="tool"
                        value={tool}
                        onClick={(e) =>
                          addQuery('tools', e.currentTarget.value)
                        }
                        key={index}
                      >
                        <span>{tool}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
      <Paginate pages={pages} page={page} addQuery={addQuery} />
    </div>
  );
};

export default HomeScreen;
