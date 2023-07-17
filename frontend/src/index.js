import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { CloudinaryContext } from 'cloudinary-react';
import cloudinary from 'cloudinary-core';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: process.env.CLOUDINALY_HOST,
});
cloudinaryCore.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CloudinaryContext cloudinary={cloudinaryCore}>
      <App />
    </CloudinaryContext>
  </Provider>
);
