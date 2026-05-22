# Save My GIF

## Description

A MERN stack authentication app project that saves users' most treasured GIFs securely.\
The app allows for users to register their details (including their GIF's url), encrypt their password and give authorization to their GIF through a custom authentication method. Additionally using JSON Web Tokens, we are able to display the logged-in users' GIFs. 

## Intresting Authentication Method

The app uses a 4 by 4 grid that user create their own custom patterns on.\
[ x ] [&emsp;] [&emsp;] [ x ]\
[&emsp;] [ x ] [&emsp;] [ x ]\
[&emsp;] [&emsp;] [ x ] [&emsp;]\
[ x ] [&emsp;] [ x ] [&emsp;]

These patterns are then used during the login process to ensure that the registered user is accessing the information, by comparing the stored pattern with the now entered pattern.

---

## Setup Guide

### Download/Copy the Repository | Repository Structure

The project is broken up into two main folders:\
Backend <-- This is were will add our server details, boot our server, encrypt our data and dictated what information we will need from the user.\

Frontend <-- Here we will display the registered users GIFs and get new user's information.

## Backend

1. Run these commands in your terminal:

```bash
cd backend
npm install
```

2. Create a `.env` file (within the backend folder); containing the following information:

```
MONGO_URI = mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/auth-demo
JWT_SECRET = any_long_random_string_here
PORT = 5000
```

3. Boot/Start the server:

```bash
npm run dev
```

The server/backend will run on **http://localhost:5000**

## Frontend

1. Run these commands in your terminal:

```bash
cd backend
npm install
```

2. Run the frontend:

```bash
npm run dev
```

The front end will run on **http://localhost:5173**

---

## Process

### 1. Register

#### User details required

```
name,
surname,
email,     <-- Our unique identifier, each user must have a different email account
password,
authCode,  <-- The user's unique auth pattern
gif        <-- The user's GIF's url to be displayed later

```
The app then makes an API call to the server to store this information.

### 2. Encrypt
Using bcrypt we hash the users submitted password and store it in the server to be compared later.

### 3. Login
#### User details required
```
email,
password,
authCode
```
The app then makes an API call to check if this user is exists/registered/authentic and if so returns a generated JSON Web Token with the required information we need to display the frontend components.

---

## Demo Video
**Link:** **https://drive.google.com/file/d/1pF6iyLjl4mJ2c5sA_CL11Pyp36VUlqx7/view?usp=drive_link**

---

### App Dependencies

**Backend:** "bcrypt, cors, dotenv, express, jsonwebtoken, mongoose

**Frontend:** react, react-dom, react-router-dom, react-bootstrap, bootstrap, material UI, motion, primereact, three
