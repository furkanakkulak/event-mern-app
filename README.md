# Event Management Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/ca1c4d9b-8cda-4303-9227-d5ab2216a342/deploy-status)](https://app.netlify.com/sites/glistening-kulfi-f450d7/deploys)

This project is a comprehensive event management platform built as the final assignment for the Techcareer Frontend Bootcamp. The platform allows users to explore, create, update, and manage various events, including concerts, sports events, and theater performances.

## Features

- **Event Management:** The platform provides complete event management capabilities. Event organizers can create, update, and delete events. Each event can have various details such as name, description, dates, location, images, ticket prices, and more.

- **Image Upload:** The platform allows event organizers to upload images related to their events. These images are displayed alongside event details, providing participants with a visual representation of the event.

- **Responsive Design:** The frontend is designed with responsiveness in mind, ensuring a consistent and user-friendly experience across different devices such as desktops, tablets, and smartphones.

- **Search and Filtering:** Users can easily search for events based on keywords, city, location, event name, category, and type. The platform also offers filtering options to narrow down search results.

- **Event Pages:** Detailed event pages offer comprehensive information about each event, including descriptions, dates, location maps, ticket prices, social media sharing buttons, and more.

- **Dashboard:** Administrators have access to a dashboard where they can manage their events. This panel enables actions such as editing event details, uploading images, and setting ticket prices.

## Project Details

This project was developed as part of the Techcareer Frontend Bootcamp's final assignment.

### Project Structure

The project consists of two main directories:

- `client`: Contains the frontend of the application, built using Next.js.
- `backend`: Houses the backend logic, including Node.js with Express for API routes and MongoDB for database interactions, as well as Firebase for image handling.

### API Documentation

The API documentation is available in the `api-documentation` folder inside the `backend` directory. It is documented using Swagger and provides detailed information about the available endpoints and their usage.

### Firebase Integration

Images are uploaded to Firebase Storage. During requests, Firebase URLs are generated and included in the response, ensuring efficient image handling.

### URL Bindings

URLs are used for search and filtering functionalities. Search queries and filter options are captured from the URL, allowing users to share specific pages and have consistent experiences.

### MongoDB

MongoDB is used for database operations, including storing event details and image names.

## Getting Started

To set up and run the project locally, follow these steps:

1. Clone this repository.
2. Navigate to the `client` directory and run `npm install` to install frontend dependencies.
3. Create a `.env.local` file in the `client` directory and set the `NEXT_PUBLIC_API_URL` to your backend API URL.
4. Navigate to the `backend` directory and run `npm install` to install backend dependencies.
5. Create a `.env` file in the `backend` directory based on the provided `.env.example` and fill in your configuration details.
6. To run the frontend, use the command `npm run dev`, and for the backend, use `npm start`, both in their respective directories.

---

This project is the culmination of dedicated effort during the Techcareer Frontend Bootcamp. It showcases a user-friendly event management platform with a seamless blend of frontend and backend technologies.

## Deployment

The project is deployed and accessible at the following URLs:

- Frontend: [event-mern-app.vercel.app](https://event-mern-app.vercel.app/) or [glistening-kulfi-f450d7.netlify.app/](https://glistening-kulfi-f450d7.netlify.app/)
- Backend: [eventpassify.onrender.com/api/events](https://eventpassify.onrender.com/api/events)

Please note that as the project is currently hosted on free-tier services, there might be certain limitations to consider:

- **Image Loading:** Due to the usage of free-tier services, image loading might experience occasional delays, especially during high-traffic periods.

- **Performance:** The overall performance of the application could be affected by the limitations of free-tier hosting. Some latency might be observed during interactions.

- **Resource Constraints:** Free-tier services often come with resource limitations. This might impact the response times and concurrent user capacity.

**API Documentation:** To access the API documentation, navigate to the `api-documentation` folder within the `backend` directory and run `npm install` and `npm start`. Swagger UI will be available at [http://localhost:8080/docs](http://localhost:8080/docs).
