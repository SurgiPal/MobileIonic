export class Auth0Vars
{
  static AUTH0_CLIENT_ID = 'AX6mKLHYp6GVtEcOe5RSmyggmZkiXyQH';
  static AUTH0_SECRET = 'WR21k3S2RcPPD6GIPrpgHbpCmzi4YPPgKUxL2kiqeFpOke_2TjSjNmoukVioucaf';
  static AUTH0_DOMAIN = 'surgipal.auth0.com';
  static AUTH0_CALLBACK_URL = location.href;
}
export let CONFIGURATION = {
  environment: "DEV",
  baseUrls: {
  //  server: 'http://localhost:32799/',
    server: 'http://surgipalapi.azurewebsites.net/',
    //server: 'https://foodchooser.azurewebsites.net/',
    apiUrl: 'http://surgipalapi.azurewebsites.net/api/'
  }
}

