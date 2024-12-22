TubeTopia - User Guide

Welcome to the TubeTopia! This app lets users vote between videos, see rankings based on Elo scores, and even upload and manage their own videos. Whether you're here to vote or upload content, this guide will help you get started.

-----------------------------------------------------------

Table of Contents
1. Landing Page
2. Voting
3. Rankings
4. Video Page
5. User Authentication
6. Dashboard
7. Uploading and Deleting Videos
8. Error Handling

-----------------------------------------------------------

Landing Page

When you visit the app, you will be instantly redirected to the Voting Page where two random videos are shown, and you are asked to vote on which one is better.

- The app allows non-logged-in users to vote for up to 10 rounds.
- After completing 10 rounds, non-logged-in users will need to wait around 2 hours for the vote count to reset.
- You can vote between the two videos, and once you vote, the Elo scores of both videos will be updated.

-----------------------------------------------------------

Voting

- The voting page (route: /) shows two videos for you to vote on.
- After voting, the next set of videos will be shown.
- If you’re not logged in, you will be limited to 10 votes before a 2-hour wait.
- If you’re logged in, you can vote as many times as you like.

-----------------------------------------------------------

Rankings

- The Rankings Page (route: /rank) shows a table of the top-rated videos according to their Elo scores.
- The page is paginated, so you can view different pages of ranked videos.
- You can click on the video title to view more details about that specific video.

-----------------------------------------------------------

Real-Time Updates

- Whenever a user votes, the Rankings Page automatically updates in real-time to reflect the new Elo scores. This ensures that users can instantly see how   their votes impact the overall rankings without needing to refresh the page.

-----------------------------------------------------------

Video Page

- When you click on a video title from the Rankings Page, you will be directed to the Video Page (route: /video/:id).
- The video page shows the video itself along with other details, such as the Elo score and the title.
- The :id refers to the unique video ID, and each video has its own specific page.

-----------------------------------------------------------

User Authentication

Sign Up / Log In
- To sign up, visit the Sign Up Page (route: /signup) where you will be prompted to enter your name, email, and password.
- After signing up, you will be logged in automatically.
- If you already have an account, simply log in from the Login Form on the same page.
- Once logged in, you get the benefit of unlimited voting and additional features like video uploads.

-----------------------------------------------------------

User Profile

- The User Profile Page (route: /profile) allows logged-in users to:
  - View their credentials.
  - View the videos they’ve uploaded.
  - Delete their own videos or Upload new videos.

-----------------------------------------------------------

Uploading and Deleting Videos

Uploading Videos
- After logging in, you can upload your own videos via the User Profile Page (route: /profile).
- When uploading a video, provide the video title and video URL.

Deleting Videos
- If you want to remove a video you uploaded, go to the User Profile Page and click the Bin icon next to the video you wish to remove.
- You can only delete videos you’ve uploaded.

-----------------------------------------------------------

Error Handling

If something goes wrong, such as:
- Invalid login credentials: You’ll get an error message saying "Invalid credentials".
- Unauthorized actions (like trying to delete a video you didn’t upload): You’ll get a "Forbidden" error.
- Form validation errors (like missing required fields): You’ll see an error message for each field that needs to be fixed.

-----------------------------------------------------------

Conclusion

TubeTopia offers an interactive experience to vote between videos, see rankings based on Elo scores, and upload your own videos. Whether you’re a casual user or an active uploader, this app is designed to keep things simple and fun!

- Non-logged-in users have limited votes per day.
- Logged-in users have unlimited votes and can upload and delete their videos.

We hope you enjoy the experience!

