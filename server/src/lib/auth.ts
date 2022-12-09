import axios from 'axios';
import firebaseAdmin, { app } from 'firebase-admin';

interface AuthTokens {
  // TODO: add refreshToken and expiresIn
  idToken: string
}

const { FIREBASE_API_KEY, FIREBASE_CREDENTIALS } = process.env;

if (FIREBASE_API_KEY === undefined || typeof FIREBASE_API_KEY !== 'string') {
  throw new Error('Invalid API key for Firebase');
}

if (FIREBASE_CREDENTIALS === undefined || typeof FIREBASE_CREDENTIALS !== 'string') {
  throw new Error('Invalid credentials provided for Firebase');
}

const IDENTITY_TOOLKIT_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';

export const initializeAuthService = (): app.App => firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(FIREBASE_CREDENTIALS)),
});

export const signup = async (email: string, password: string): Promise<AuthTokens> => {
  const url = `${IDENTITY_TOOLKIT_URL}:signUp?key=${FIREBASE_API_KEY}`;

  const { data } = await axios.post(url, { email, password, returnSecureToken: true });

  return { idToken: data.idToken };
};
