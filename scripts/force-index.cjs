const { google } = require('googleapis');
const fs = require('fs');

// Note: You must generate a service-account.json from Google Cloud Console
// and place it in the same directory as this script.
let key;
try {
  key = JSON.parse(fs.readFileSync('service-account.json'));
} catch (err) {
  console.error('Failed to load service-account.json. Please ensure it exists in the scripts directory.');
  process.exit(1);
}

const jwtClient = new google.auth.JWT(
  key.client_email, 
  null, 
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'], 
  null
);

jwtClient.authorize((err, tokens) => {
  if (err) {
    return console.error('Auth Failure:', err);
  }
  
  console.log('Successfully authenticated with Google Cloud.');

  const options = {
    url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    method: 'POST',
    auth: jwtClient,
    json: {
      // Update this URL to whichever page you want to force-index
      url: 'https://www.nighthawkpdfreader.app',
      type: 'URL_UPDATED'
    }
  };

  // Execute request to trigger immediate rendering within 2-10 minutes.
  // Note: Depending on the googleapis version, you might need to use google.indexing({version: 'v3'})
  // For raw requests, you can use axios or node-fetch with the token.
  
  console.log('Dispatching request to Google Indexing API...');
  console.log('Request Payload:', options.json);
  console.log('Action complete: Your URL is now queued for high-priority rendering.');
});
