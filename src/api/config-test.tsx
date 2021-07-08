const config = {
  cognito: {
    REGION: 'ap-southeast-1',
    USER_POOL_ID: 'ap-southeast-1_cpc5Afjvo',
    USERPOOL_WEB_CLIENT_ID: '9d2inj4pf1phbc9hdhdf5cr67',
    IDENTITY_POOL_ID: 'ap-southeast-1:73b27d27-9d7c-453b-8bd0-cc5e5f27ea7f',
    oauth: {
      domain: 'karobar-test.auth.ap-southeast-1.amazoncognito.com',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'bottle-karobar://',
      redirectSignOut: 'bottle-karobar://',
      responseType: 'code',
    },
    federationTarget: 'COGNITO_USER_POOLS',
  },

  apiGateway: {
    REGION: 'ap-southeast-1',
    URL: 'https://aahzatn9sl.execute-api.ap-southeast-1.amazonaws.com/test/',
    KAROBAR_URL:
      'https://ttzoosw0jb.execute-api.ap-southeast-1.amazonaws.com/test/',
    SMART_AD: 'https://f6urqz0ssc.execute-api.ap-south-1.amazonaws.com/prod/',
  },
};

export default config;
