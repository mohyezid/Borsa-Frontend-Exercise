# Frontend Exercise

This repo contains a solution for a code exercise. The test question can be found in the repo. The app is setup using `vite` and it is a responsive site that uses `redux toolkit` and `redux saga` for state management and `tailwind` for the UI.

## Setting up the project

1. `npm install`
2. `npm run dev`
   

## Pages

1. `/login` - Login Page
2. `/signup` - Signup Page
3. `/home` - Home / Users Page
4. `/profile` - Edit Profile Page

## The Flow

1. Create a user on signup page
2. Login with the newly created user
3. You will be redirected on to home page on successfull login
4. On the Home Page scroll down to load more users (the page implements an infinite scroll feature)
5. Go to profile page using the link on the navbar to edit profile
6. Sign out to end
