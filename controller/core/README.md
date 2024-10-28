# Osiris API Setup Guide

This guide explains how to set up the dependencies, environment variables, and build the Osiris API project on your local machine.

---

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **Docker** (for containerized development, if applicable)
- **MongoDB** (or access to a MongoDB instance)

---

## Step 1: Install Project Dependencies

Navigate to the `core` directory of the project, then run the following command to install all dependencies:

```bash
cd core
npm install
```

## Step 2: Make core/.env and fill in the following environment variables
```env
MONGO_USERNAME=yourMongoUsername
MONGO_PASSWORD=yourMongoPassword
MONGO_DATABASE=yourDatabaseName
PORT=yourPortNumber
```
Talk to Aryan asap for credentials, discord user is sucko

## Step 3: Transpile the Typescript Code into Javascript Code

Navigate to the `core` directory of the project, then run the following scrit to build dist/ with the javascript files:
```bash
cd core
npm run build
```

## Step 4: Run the API in Development Mode
```bash
cd core
npm run dev
```

## Additional Notes:
Check package.json for other scripts
### We don't have Docker yet, but we will make a Dockerfile with its config soon
