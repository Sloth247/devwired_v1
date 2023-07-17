import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    jobListing: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job',
      },
      company: { type: String, required: true },
      logo: { type: String, required: true },
      position: { type: String, required: true },
      location: { type: String, required: true },
    },

    resume: {
      type: String,
      required: true,
    },
    coverletter: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Application sent',
      requrired: true,
      enum: [
        'Application sent',
        'Interviewing',
        'Offer recieved',
        'Hired',
        'Declined',
        'Not selected by employer',
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;
