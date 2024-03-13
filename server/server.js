const express = require('express')
const axios = require('axios')
const OAuth2Data = require('./credentials1.json')
const app = express()
const {google} = require('googleapis')
var videoID = "";
const apiKey = "AIzaSyD7cYS4vjyKVAgYP74UtFBGK9ecqPD18cE";
const baseApiUrl = "https://www.googleapis.com/youtube/v3";

const session = require('express-session')

app.use(session({
    secret: 'applePie', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto', httpOnly: true }
}))

const scopes = [
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/youtubepartner'
  ];

  const client_ID = OAuth2Data.web.client_id;
const client_secret = OAuth2Data.web.client_secret;
const redirect_url = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
    client_ID,
    client_secret,
    redirect_url
);
const youtube = google.youtube({
    version: "v3",
    auth: oAuth2Client,
});

    var authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
    scope: scopes
    })
    const cors = require('cors');
    const corsOptions = {
        origin: 'http://localhost:3000', // or the actual origin of your frontend
        credentials: true,
    };
app.use(cors(corsOptions)); 

app.use(express.json());

        app.get('/api/verify-token', (req, res) => {
    res.status(405).json({ message: "Dont make a GET request here" });
});

    app.post('/api/verify-token', async (req, res) => {
        const { idToken, accessToken } = req.body;
    
        if (!idToken) {
            return res.status(400).send({ message: 'No ID token provided' });
        }
        if (!accessToken) {
            return res.status(400).send({ message: 'No Access token provided' });
        }
        try {

            const ticket = await oAuth2Client.verifyIdToken({
                idToken: idToken,
                audience: client_ID,
            });

            

            const payload = ticket.getPayload();
            req.session.accessToken = accessToken;
            req.session.save(err => {
                if (err) {
                    console.error('cant save session:', err);
                }
            });
            // console.log("After saving", req.session)

            const { name, email } = req.body;
            const info = { name, email };
            const { i } = req.session;
            if (i){
                req.session.i.items.push(info);
            }
            else {
                req.session.i = {
                    items: [info],
                };
            }
            res.json({ message: 'Token is verified from backend', user: payload });
        }
        catch (error){
            console.error('Error during token exchange:', error);
            res.status(500).send({ message: 'verify-token Internal server error', error: error.toString() });
        }
    })


async function getCaptionsList(authClient){
    console.log("Session videoID: ", videoId)
    try{
    const response = await youtube.captions.list({
        part: 'snippet',
        videoId: videoId,
    });
    console.log(response)
    if(response.data && response.data.items){
        // const result = response.data.items;
        // return result[0];
        return response.data.items.slice(0, 1);
    }
    else {
        console.error('No captions found or invalid response:', response);
            return []; 
    }
} catch(err){
        console.error("Error listing captions: ", err.message);
        throw err; // This will reject the promise with 'err'
    
}
    
}

function getCaptionsID(captionsList, authClient){
    // const ids = captionsList.map(item => item.id);
    //console.log(ids);
    // return ids;

    return captionsList.length > 0 ? captionsList[0].id : undefined;
}
async function getCaptions(id, authClient){

    let captionsArray = [];

    if (id) {
        try {
            const response = await youtube.captions.download({
                id: id,
                tfmt: 'srt',
                auth: authClient
            }, {
                responseType: 'stream'
            });

            const captionStream = response.data;
            let captionData = '';

            for await (const chunk of captionStream) {
                captionData += chunk.toString();
            }
            captionsArray.push(captionData);
        } catch (error) {
            console.error('Error downloading caption ID:', id, error);
        }
    }

    return captionsArray;
}

function countWords(transcript, wordsToCount){
    if (typeof transcript !== 'string') {
        console.error('Transcript is not a string:', transcript);
        return;
    }
    const ntranscript = transcript.toLowerCase();
    const words = ntranscript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
    console.log(words);

    let counts = 0;

    
    words.forEach(word => {
        if (wordsToCount.includes(word)) {
            counts++;
        }
    });
    console.log(counts);
    return counts
}
const wordsToCount = ["yeah", "yes", "mhm"];


app.post('/getTranscript', async (req, res, next) => {
    console.log(req);
    try {
        const input = req.body.searchQuery;
        if (!input) {
            return res.status(400).send({ message: 'No video URL provided :(' });
        }

        const url = input.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([^&]*)/);

        if(!url){
            return res.status(400).send({ message: 'Invalid Youtube Link' });
        }
        videoId = url[1];
const data = { message: "Success from backend", videoId: videoId};
        res.status(200).json(data);
      } catch (error) {
        console.error("Error getting user input:", error);
        res.status(500).json({ message: "Internal server error" });
      }
})

app.get("/getTranscript", async (req, res, next) => {


    oAuth2Client.setCredentials({
        access_token: req.session.accessToken,
    });
    console.log("oAuthClient in getTranscript:", oAuth2Client)
    if (!req.session.accessToken) {
        return res.status(401).send({ message: 'Unauthorized: No access token available' });
    }

    const videoId = req.session.videoId;
     console.log("GET request to /getTranscript videoID:", videoId);
    

    try {
        const captionsList = await getCaptionsList(oAuth2Client);
        const captionsID = getCaptionsID(captionsList);

        if (!captionsID) {
            throw new Error('No captions ID found');
        }
        const transcript = await getCaptions(captionsID, oAuth2Client);
        if (transcript.length === 0) {
            throw new Error('No captions found');
        }
        const counts = countWords(transcript.toString(), wordsToCount);
        res.json(counts);
    }
    catch(err){
        console.error(err); // Log the error
        res.status(500).send({ message: 'getTranscript Internal server error', error: err.message });
    }

})









app.listen(5000, () => { console.log("Server started on port 5000!")})

