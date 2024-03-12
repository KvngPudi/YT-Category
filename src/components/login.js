import './login.css'
import { GoogleLogin } from 'react-google-login';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id;
function Login() {

    const onSuccess = (res) => {
        console.log("Login Successful: ", res.profileObj);
        console.log('ID Token:', res.tokenId);
        console.log('Access Token:', res.accessToken);

        fetch('http://localhost:5000/api/verify-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({idToken: res.tokenId,
                accessToken: res.accessToken,
            }),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(response => {
        // Handle response data from the backend
        console.log("response:", response);
    })
    .catch(error => {
        console.error("Error passing token to backend", error);
    });
    };
    const onFailure = (res) => {
        console.log("Login Failure: ", res);
    }
    return(
        <div id="signInButton">
            <GoogleLogin 
            clientId={client_ID}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true} />
        </div>
    )
}

export default Login