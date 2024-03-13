# Yeah-Counter
This project is a simple web application that counts the amount of "yes" in a youtube video.
**Link to project:** [http://recruiters-love-seeing-live-demos.com/](https://github.com/KvngPudi/YT-Category)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, ReactJS, Node.js, ExpressJS

Frontend: I built this section using ReactJS and dynamically presented the data. Although there are not many pages within this website, I made use of useState and useEffect. Specifcally, I used them to structure the webpage and allow for conditional rendering. Based on the data given from the user, the application desides whether or not to render the total amount of "yes".

Backend: I built this using Node.js. The backend handles all of the logic when it comes to generating a result for the user. The user sends a youtube link to the search bar. Then, on the backend, I ensure that it is a youtube link and grab the video ID. Because the youtube API give so much data per request, I simplify the requests to give me the captions. From there, I count all the "yes" and return it to the user.
One of the biggest hurdles in this project was the OAuth 2.0 flow (more on this later).
## Optimizations
Initially, I rendered the components all at once: search bar, OAuth login, and backend data display. Quickly, I found this to be inefficient, so I used conditional rendering. There is no need for me to process all the GET and POST requests if the user does not send a proper youtube link. Only after the user has been authenticated and the youtube link has been verified, the backend runs all its functions, GET requests, and POST requests.

## Lessons Learned:

The biggest issue I faced throughout this project with the OAuth 2.0 flow. Initially, I thought I could handle all of the authentication in the backend. However, this led to a lot of complexities with the user experience and the scalability. Taking this into consideration, I decided to have the OAuth authentication in the front-end. This was simple enough, but sending this information the backend was harder than I thought it was. After using POST requests, I finally send the information the backend. However, now I could not do anything with these credentials. I used sessions and JWTs to track a users credentials and call the Youtube API from it. 

