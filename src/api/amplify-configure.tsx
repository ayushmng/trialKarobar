import Amplify, {Auth} from 'aws-amplify';
import config from './config-test';
import urlOpener from './urlOpener';
const configureAmplify = (): void => {
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.USERPOOL_WEB_CLIENT_ID,
      oauth: {
        domain: config.cognito.oauth.domain,
        scope: config.cognito.oauth.scope,
        redirectSignIn: config.cognito.oauth.redirectSignIn,
        redirectSignOut: config.cognito.oauth.redirectSignOut,
        responseType: config.cognito.oauth.responseType,
        urlOpener,
      },
      federationTarget: config.cognito.federationTarget,
    },
    API: {
      endpoints: [
        {
          name: 'karobarApi',
          endpoint: config.apiGateway.KAROBAR_URL,
          region: config.apiGateway.REGION,
          custom_header: async () => {
            const session = await Auth.currentSession();
            console.log('JwtToken: ', session.getIdToken().getJwtToken());
            return {
              Authorization: session.getIdToken().getJwtToken(),
            };
          },
        },

        {
          name: 'karobarAuthApi',
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION,
          custom_header: async () => {
            const session = await Auth.currentSession();

            return {
              Authorization: session.getIdToken().getJwtToken(),
            };
          },
        },
        {
          name: 'karobarUnauthApiSearch',
          endpoint: config.apiGateway.KAROBAR_URL,
          region: config.apiGateway.REGION,
        },
        {
          name: 'karobarUnauthApi',
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION,
        },
        {
          name: 'smartAdUnauthApi',
          endpoint: config.apiGateway.SMART_AD,
          region: config.apiGateway.REGION,
        },
      ],
    },
  });
};

export default configureAmplify;
