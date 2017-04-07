export class Auth0Vars {
  static AUTH0_CLIENT_ID = 'AX6mKLHYp6GVtEcOe5RSmyggmZkiXyQH';
  static AUTH0_SECRET = 'WR21k3S2RcPPD6GIPrpgHbpCmzi4YPPgKUxL2kiqeFpOke_2TjSjNmoukVioucaf';
  static AUTH0_DOMAIN = 'surgipal.auth0.com';
  static AUTH0_CALLBACK_URL = location.href;
}



export let CONFIGURATION = {
  environment: "DEV",
  baseUrls: {
    // server: 'http://localhost:32799/',
    // apiUrl: 'http://localhost:32799/api/'
    server: 'http://surgipalapi.azurewebsites.net/',
    apiUrl: 'http://surgipalapi.azurewebsites.net/api/',
    apiPhpUrl: 'http://surgipal.com/api/api.php/'
  },
  apiUrls: {
    message: 'http://surgipal.com/api/api.php/doctor_message/',
    glovesize: 'http://surgipal.com/api/api.php/glove_size/'
  }
}


