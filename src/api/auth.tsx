import {Auth} from 'aws-amplify';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth/lib/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  CognitoUser,
  CognitoUserSession,
  ISignUpResult,
} from 'amazon-cognito-identity-js';

export interface AddUser {
  email?: string;
  password?: string;
  username?: string;
  navigation?: StackNavigationProp<any>;
}

export interface SignUpConfirm {
  email?: string;
  code?: string;
  navigation?: StackNavigationProp<any>;
}

export interface Signin {
  email?: string;
  password?: string;
  navigation?: StackNavigationProp<any>;
}

export const addUserApi = (
  arg: AddUser,
): Promise<ISignUpResult> | undefined => {
  const {username, password, email} = arg;
  try {
    if (username && password && email) {
      return Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: username,
        },
      });
    }
  } catch (error) {
    console.log('error signing up:', error);
  }
};

export interface FederatedSignin {
  provider: string | undefined;
}

export const signInApi = ({
  email,
  password,
}: Signin): Promise<CognitoUser> | undefined => {
  if (password && email) {
    console.log('called', password, email);
    return Auth.signIn(email, password);
  }
};

export const signOutApi = (): Promise<any> => {
  return Auth.signOut();
};

export const confirmSignUpApi = ({
  email,
  code,
}: SignUpConfirm): Promise<any> | undefined => {
  if (email && code) {
    return Auth.confirmSignUp(email, code, {forceAliasCreation: true});
  }
};

export const federatedSignInApi = ({
  provider,
}: FederatedSignin): Promise<any> | undefined => {
  if (provider === 'google') {
    return Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  } else if (provider === 'facebook') {
    return Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook,
    });
  } else if (provider === 'Twitter') {
    return Auth.federatedSignIn({
      provider: 'Twitter' as any,
    });
  } else if (provider === 'Apple') {
    return Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Apple,
    });
  }
};

export const getSession = (): Promise<CognitoUserSession | null> => {
  return new Promise((resolve, reject) => {
    Auth.currentSession()
      .then(() =>
        Auth.currentAuthenticatedUser({bypassCache: true})
          .then(resolve)
          .catch(reject),
      )
      .catch(reject);
  });
};
