# Devwired - Job Listing Website with the MERN stack

This is a full-stack web app for listing job openings and facilitating job applications. The design for this project includes elements inspired by [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Filter job listings based on the categories
- View the job details and their profiles
- Edit and update their profiles
- Regiter or sign in using their email and password
- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page

Client Users should be able to:

- Apply for jobs
- Track the application history
- Update their application status during the hiring process

Admin User should be able to:

- View and edit user details, as well as delete user accounts
- Manage job details, including creation, editing, and deletion of job listings
- Access the list of job applications

### Screenshot

![](./readme/desktop-view.png)

### Links

- Live Site URL: [https://www.devwireddemo.com/](https://www.devwireddemo.com/)

## My process

### Built with

**Front-end**

- Semantic HTML5 markup
- CSS custom properties
- Responsive
- Sass/Scss
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [React bootstrap](https://react-bootstrap.netlify.app/)

**Back-end**

- Node.js
- express
- nodemon
- MongoDB
- mongoose
- multer
- jsonwebtoken

**Other**

- [Cloudinary](https://cloudinary.com/)

### What I learned

**Backend**

This was my first time using Cloudinary to store data. I encountered an issue with properly updating `.docx` files on the `Apply screen`. After reading the documentation, I discovered that adding `resource_type = 'raw'` to the `CloudinaryStorage` resolved the problem. Additionally, Cloudinary was blocking PDF files by default, so I adjusted the settings on the Cloudinary portal.

**Frontend**

Designing routes for multiple screens was certainly challenging. I ensured that users are redirected to the login page if they are not logged in. Drawing inspiration from the Indeed website, I disabled the apply button on the Job Details screen when the user has already applied for the job.

I used React Bootstrap for warning/success messages and loading spinners, which allowed for consistent styling and reuse across various pages.

React bootstrap is used for the warning/sucess messages and loading spinner to easily style and reuse on the multiple pages.

**Other**

Initially, I used `concurrently` to run both the frontend and backend on `localhost:3000`. However, I encountered issues. To resolve this, I installed the `http-proxy-middleware` package and created a `setupProxy.js` file in the frontend folder. This solution proved effective.

### Continued development

In the future, I plan to implement a feature that allows company HR teams to post job listings and directly contact job applicants.

I aim to enhance design contrast for better accessibility in my next projects. While I followed the original design from Frontend Mentor this time, I believe there's room for improvement.

## Author

- Website - [Yuko Horita](https://www.yuko-h.com)
- Frontend Mentor - [@Sloth247](https://www.frontendmentor.io/profile/Sloth247)
