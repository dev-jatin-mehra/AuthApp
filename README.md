## Macu Auth – Modular Authentication System

Macu Auth is a reusable full-stack authentication system built using React, Node.js, Express, and MongoDB. It is designed to serve as a ready-made authentication wrapper for web applications so that developers can skip writing auth logic from scratch and focus on building core product features.

## Description

This project implements a secure authentication workflow with features like user registration, login, password reset, and email verification using OTPs. It follows modular structure and best practices for scalability and reusability.

## Features

- Secure user registration and login with JWT (access + refresh)
- Role-based routing and protected routes
- OTP-based email verification
- Password reset functionality
- CORS-ready and production-compatible
- Fully frontend-backend decoupled

## Tech Stack

- **Frontend**: React, TailwindCSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Smtp Server**: Brevo

## Tools & Libraries

- Axios
- bcrypt
- nodemailer
- dotenv
- Brevo
- React Toastify
- Vercel (frontend deployment)
- Render / Railway / Cyclic (backend deployment)

## API Routes

### Auth Routes (`/api/auth`)

- `POST /register`  
  Registers a new user with name, email, and password.

- `POST /login`  
  Logs in a user with email and password. Returns JWT tokens.

- `POST /logout`  
  Logs out the user by clearing refresh token.

- `POST /send-verify-otp`  
  Sends an OTP to the user's email for verification.

- `POST /verify-otp`  
  Verifies the email using the submitted OTP.

- `POST /send-reset-otp`  
  Sends a password reset OTP to the user's email.

- `POST /reset-password`  
  Resets the password after verifying OTP.

### User Routes (`/api/user`)

- `GET /data`  
  Returns authenticated user's data (requires token).

## Why Use This

- Save time by using a prebuilt secure authentication layer
- Plug-and-play integration with MERN stack projects
- Reduces bugs and security issues in custom auth logic
- Suitable for both learning and real-world projects

## Deployment

- Frontend: Deploy to Vercel
- Backend: Deploy to Render, Railway, or Cyclic
- Configure `.env` files on both ends for API URL, JWT secrets, and MongoDB URI
