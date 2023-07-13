import dotenv from 'dotenv';
import connectDB from './config/db.js';
import jobs from './_data/jobs.js';
import users from './_data/users.js';

import Job from './models/Job.js';
import User from './models/userModel.js';
import Application from './models/applicationModel.js';

// Load env vars
dotenv.config();

connectDB();

// // Connect to db
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Read JSON files
// const jobs = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/data.json`, 'utf-8')
// );

// Import into DB
const importData = async () => {
  try {
    await Application.deleteMany();
    await Job.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleJobs = jobs.map((job) => {
      return { ...job, user: adminUser };
    });

    await Job.insertMany(sampleJobs);

    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await Application.deleteMany();
    await Job.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
