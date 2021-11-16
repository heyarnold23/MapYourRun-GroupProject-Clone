# MapYourRun

![GIF of MapYourRun splash page](https://i.ibb.co/vc28xVP/ezgif-7-6f63c89c200c.gif)

## What is MapYourRun?

[MapYourRun]() is a full stack app utilizing PostgreSQL, Flask, and React/Redux. MapYourRun allows logged in users to create running routes by interacting with a map, keep track of their created running routes, as well as interact with others in a social media like manner with the 'Activity Feed'.

## Features

### Routes

Logged in users can create routes via interacting with our integrated MapBox API

![GIF of routes feature](https://i.ibb.co/j8FYGVN/ezgif-7-9aa649732de7.gif)

### Dashboard

Logged in users are able to view their created routes and stats via the dashboard.

![GIF of dashboard feature](https://i.ibb.co/HNTDqYd/ezgif-7-1e9f8cb68d0f.gif)

### Comments

Logged in users are able to comment on other user's routes

![GIF of comment feature](https://i.ibb.co/mHJZwnz/ezgif-7-d3257d535762.gif)

### Friends/Social

Logged in users are able to friend each other on the Activity Feed and see pending/incoming requests under the Social tab.

![GIF of friend feature](https://i.ibb.co/R7T4G72/ezgif-7-0c2e78b80740.gif)

## Application Architecture

MapYourRun is built on a React frontend with a Flask backend, using PostgreSQL as a database.

### Frontend Technologies Used

- React 
- Redux
- MapBox API
   - The MapBox API was implemented to allow users to seamlessly create routes.


## Backend Overview

MapYourRun uses a Flask server with a PostgreSQL database.

### Backend Technologies Used

- Flask
- SQLAlchemy
- PostgreSQL

## Conclusion and Next Steps

So far we are pleased with the way MapYourRun has turned out. At this moment, we plan to touch up some styling on the page and perhaps implement pagination for the activity feed. 
