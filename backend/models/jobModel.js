import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please add a company'],
      trim: true,
      maxlength: [50, 'Company name can not be more than 50 characters'],
    },

    logo: {
      type: String,
      required: [true, 'Please add a logo'],
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      required: [true, 'Please add a position'],
      maxlength: [100, '`Position` can not be more than 50 characters'],
    },
    role: {
      type: String,
      required: true,
      enum: ['Frontend', 'Fullstack', 'Backend'],
    },
    level: {
      type: String,
      required: true,
      enum: ['Junior', 'Midweight', 'Senior'],
    },
    postedAt: {
      type: String,
    },
    contract: {
      type: String,
      required: true,
      enum: ['Full Time', 'Part Time', 'Contract'],
    },
    location: { type: String, required: [true, 'Please add a location'] },
    languages: { type: [String], required: [true, 'Please add languages'] },
    tools: { type: [String], required: false },
    overview: { type: String, required: true },
    qualifications: { type: [String], required: true },
    salaryStart: { type: Number, required: false, default: 0 },
    salaryEnd: { type: Number, required: false, default: 0 },
    hours: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    remarks: { type: [String], required: false },
  },
  { timestamps: true }
);

// // Create job slug from the company name
// JobSchema.pre('save', function (next) {
//   this.slug = slugify(this.company, { lower: true });
//   next();
// });

const Job = mongoose.model('Job', JobSchema);

export default Job;
