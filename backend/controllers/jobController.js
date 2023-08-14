import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Job from '../models/jobModel.js';

// @desc Get all jobs
// @routes GET /api/jobs
// @access Public
const getJobs = asyncHandler(async (req, res, next) => {
  let query;
  // copy req.query
  const reqQuery = { ...req.query };
  // create query string
  let queryStr = JSON.stringify(reqQuery);
  // create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  const pageSize = 10;
  let page = 1;
  if (reqQuery.pageNumber && !isNaN(reqQuery.pageNumber)) {
    page = Number(reqQuery.pageNumber);
    console.log(reqQuery.pageNumber);
  }

  const count = await Job.countDocuments();
  // Finding resource
  const jobs = await Job.find(
    reqQuery.pageNumber && !isNaN(reqQuery.pageNumber)
      ? {}
      : JSON.parse(queryStr)
  )
    .sort({ featured: -1, isNew: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (jobs) {
    res.json({ jobs, page, pages: Math.ceil(count / pageSize) });
  } else {
    return next(new ErrorResponse('Job not found', 404));
  }
});

// @desc Get single job
// @routes GET /api/jobs/:id
// @access Public
const getJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404)
    );
  }

  res.json(job);
});

// @desc Create a job
// @routes POST /api/jobs
// @access Private/Admin
const createJob = asyncHandler(async (req, res, next) => {
  const job = new Job({
    user: req.user._id,
    company: 'Sample company',
    logo: '/images/sample.jpeg',
    isNew: true,
    featured: false,
    position: 'Sample position',
    role: 'Frontend',
    level: 'Junior',
    contract: 'Full Time',
    location: 'Sample location',
    languages: 'Sample language',
    tools: 'Sample tool',
    overview: 'Sample overview',
    qualifications: 'Sample qualification',
    salaryStart: 0,
    salaryEnd: 0,
    hours: '8am - 5pm',
    responsibilities: 'Sample responsibility',
    remarks: 'Sample remarks',
  });

  const createdJob = await job.save();

  res.status(201).json({
    success: true,
    data: createdJob,
  });
});

// @desc Update single job
// @routes PUT /api/jobs/:id
// @access Private/Admin
const updateJob = asyncHandler(async (req, res, next) => {
  const {
    company,
    logo,
    isNew,
    featured,
    position,
    role,
    level,
    contract,
    location,
    languages,
    tools,
    overview,
    qualifications,
    salaryStart,
    salaryEnd,
    hours,
    responsibilities,
    remarks,
  } = req.body;

  const job = await Job.findById(req.params.id);

  if (job) {
    (job.company = company),
      (job.logo = logo),
      (job.isNew = isNew),
      (job.featured = featured),
      (job.position = position),
      (job.role = role),
      (job.level = level),
      (job.contract = contract),
      (job.location = location),
      (job.languages = languages),
      (job.tools = tools),
      (job.overview = overview),
      (job.qualifications = qualifications),
      (job.salaryStart = salaryStart),
      (job.salaryEnd = salaryEnd),
      (job.hours = hours),
      (job.responsibilities = responsibilities),
      (job.remarks = remarks);

    const updatedJob = await job.save();
    res.json(updatedJob);
  } else {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: job });
});

// @desc Delete a job
// @routes DELETE /api/jobs/:id
// @access Private/Admin
const deleteJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (job) {
    res.json({ message: 'Job removed' });
  } else {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404)
    );
  }
});

// @desc Update logo image
// @routes POST /api/jobs/image
// @access Private
const updateImage = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  const image = await Job.findByIdAndUpdate(req.params.id, {
    logo: req.file.path,
  });

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  res.status(201).json({
    success: true,
    data: image,
  });
});

export { getJobs, getJob, createJob, deleteJob, updateImage, updateJob };
