Occasionton README

# Project Overview

## Introduction

This project is an event management platform that allows users to browse and book into events. Users can also view a list of events they have signed up for and can add events to their **google calender** during the sign up process.

## Features

    -   It has a landing page to welcome and introduce users to the app.
    -   It allows users to sign up and log in for the in order to join an event
    -   it allows users to view a list of events they have sign up for.
    -   It allows admins/staff to enter events, edit and delete them.

## Tech Stack

1. React Vite
2. Appwrite
3. Tailwind CSS
4. React Router
5. React Icons
6. React Toastfy
7. Heroicons

## Getting started

### Clone the Repository

Clone these two reposotories and cd into each of them;
run npm install.

1. Git clone the frontend repo : <https://github.com/Ziyardeen/occasionton.git>
2. Git clone the appwrite server repo : <https://github.com/Ziyardeen/Occasionton-Server-side.git>

### Setting up Appwrite cloud Server

A.

#### Manual SetUp

1. visit https://cloud.appwrite.io/console/ and signup or signin if you already have an account.
2. Create a project in your preferred name
3. Add a WEB platform, use your preffered name and type in [*localhost] in the Hostname.
4. At the overview page, scroll down to the bottom where you will see PLATFORMS under the INTEGRATIONS tab. Repeat step three and use [\*.netlify.app] for Hostname this time around. Use your preferred hosting platform if you do not want to use NETLIFY.
5. At the overview tab next to the project name, copy the project ID and store it somewhere safe.
6. Still at the overview, scroll to the bottom where you will find integrations. You will see API keys tab next to the Platforms tab. CREATE AN API KEY, SELECT ALL SCOPES and store it somewhere safe.

OR

B.

#### Pre-setup

1. Just log into appwrite cloud with the credentials that will be provided and obtain all `env` variables required.

### Automatically creating the database, collections, file Storage bucket and seeding if required.

1.  Move to the server side repo do and:
    a. Create a .env file and fill it with the following:

            APPWRITE_ENDPOINT=your_appwrite_endpoint (This is from appwrite console and is usually <https://cloud.appwrite.io/v1> )

            APPWRITE_API_KEY=your_appwrite_api_key ( You must have saved this somewhere during your appwrite console creation. You can also access this from the api keys section of the appwrite console.)

            APPWRITE_PROJECT_ID=your_project_id (You must have saved this somewhere during your appwrite console creation. You can also access this from the projects section of the appwrite console.)

            APPWRITE_DATABASE_ID=occasiontonDb
            APPWRITE_EVENTS_COLLECTION_ID=eventsColId
            APPWRITE_EVENTS_STORAGE_BUCKET_ID=EventsImageBucketId

    b. run <npm install>

    c. Uncomment the following lines and run them sequentially to set up your cloud resources by running [ node app.js ] on the root terminal. THEN COMMENT IT BACK AND UNCOMMENT THE NEXT FUNCTION AND RUN [ node app.js ] again.

        eg. {
                createDatabase(); // uncommented
                node run ( on the terminal)
            }

            // createDatabase();
            // createEventsCollection();
            // seed(events);
            // createBucket();

2.  createDatabase(): Creates the Occasionton database in Appwrite.
3.  createEventsCollection(): Sets up the Events collection in the database.
4.  createBucket(): Creates the Events Image storage bucket for file uploads.

5.  seed(events): Seeds the collection with sample event data. ONLY if you want to populate the app with these data. Or you can alos modify them to your data.

Ensure each function runs successfully before proceeding to the next.

### Loading the Front end Application

    1. Create a .env file and fill it with the following:

        VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint (This is from appwrite console and is usually <https://cloud.appwrite.io/v1> )

        VITE_APPWRITE_APIKEY=your_appwrite_api_key ( You must have saved this somewhere during your appwrite console creation. You can also access this from the api keys section of the appwrite console.)

        VITE_APPWRITE_PROJECT_ID=your_project_id (You must have saved this somewhere during your appwrite console creation. You can also access this from the projects section of the appwrite console.)

        VITE_APPWRITE_DATABASE_ID=occasiontonDb
        VITE_APPWRITE_EVENTS_COLLECTION_ID=eventsColId
        VITE_APPWRITE_EVENTS_STORAGE_BUCKET_ID=EventsImageBucketId

    2. Run <npm install> on the root terminal
        To install all dependencies needed.

    3. Run npm run dev
        To run the app on the development and locally on your PC.

    4. You can also host it on your preferred hosting service like Netlify (A platform should be created on appwrite for any hosting service you intend to use to prevent Cors errors) a platform should have been created for netlify as recommeded during your appwrite configuration unless you chose a different hosting service during that configauration.

    IMPORTANT: After hosting, ensure to change the <baseUrl> value to the base url of the hosted site in <SignUp.jsx> file.

    Do not forget about the .env variibles when hosting.

### Providing labels (admin, staff, etc) on Appwrite cloud Console

Only users with a role can access the staff dashboard to add and manage events

1. Log in to Appwrite Console.
2. Go to the "Auth" section in the sidebar and select Users.
3. Select the user you want to assign a label to.
4. In the user details, find the Labels section and click Add Label.
5. Enter a label name (e.g., "admin, staff etc") and save.
