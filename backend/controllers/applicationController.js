import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Application from '../models/applicationModel.js';

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
const addApplication = asyncHandler(async (req, res) => {
  const { jobListing, resume, coverletter, status } = req.body;

  if (jobListing && jobListing.length === 0) {
    res.status(400);
    throw new Error('No application');
    return;
  } else {
    const application = new Application({
      jobListing,
      user: req.user._id,
      resume,
      coverletter,
      status,
    });

    const createdApplication = await application.save();

    res.status(201).json(createdApplication);
  }
});

// @desc    Get application by ID
// @route   GET /api/applications/:id
// @access  Private
const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    res.json(application);
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});

// @desc    Get logged in user applications
// @route   GET /api/applications/myapplications
// @access  Private
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ user: req.user._id });
  res.json(applications);
});

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private/Admin
const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({}).populate('user', 'id name');
  res.json(applications);
});

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    application.status = req.body.status;

    const updateApplication = await application.save();

    res.json(updateApplication);
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});

export {
  addApplication,
  getApplicationById,
  getMyApplications,
  getApplications,
  updateApplicationStatus,
};
