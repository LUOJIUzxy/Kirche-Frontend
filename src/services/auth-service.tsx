import http from '../utils/http';
import { ENDPOINT } from '../constants/api';
import { AxiosError, AxiosResponse } from 'axios';
import { AuthUser } from '../types/auth';
import { NotificationType } from '../enum/notification-type-enum';
import { NotificationService } from './notification-service';

const Auth = ENDPOINT.AUTH;

const AuthService = {
  //just a function to validate the JWT when needed
  validateJWT: async () => {
    try {
      const response: AxiosResponse = await http.get(Auth.VALIDATE);
      if (response) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        NotificationService(
          'Validate JWT Fail',
          NotificationType.DANGER,
          error.response?.data.message
        );
      }
      return error;
    }
  },

  encryptPassword: async (password: string) => {
    const getPublicKey = async () => {
      try {
        const response: AxiosResponse = await http.get(Auth.PUBLIC_KEY);
        if (response && response.data) {
          return response.data;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          NotificationService(
            'Fail To Get Public Key',
            NotificationType.DANGER,
            error.response?.data.message
          );
        }
        return error;
      }
    };

    const bigIntToBase64 = (e: number) => {
      // util function for convert big int in public key to base64
      let hex = e.toString(16);
      if (hex.length % 2) {
        hex = '0' + hex;
      }

      const bin = [];
      let d = 0;
      let b = '';
      for (let i = 0; i < hex.length; i += 2) {
        d = parseInt(hex.slice(i, i + 2), 16);
        b = String.fromCharCode(d);
        bin.push(b);
      }

      return btoa(bin.join(''));
    };

    function convertModulus(modulus) {
      // Remove colons and leading zeros
      const cleanModulus = modulus.replace(/:/g, '').replace(/^0+/, '');
    
      // Convert to hexadecimal
      const hexModulus = Buffer.from(cleanModulus, 'hex');
    
      return hexModulus;
    }

    //let encrypted = "";
    const key = await getPublicKey();
    //const encrypted = await encryption(key, password);
    // Only import and use in a client-side context
    // if (typeof window !== "undefined") {
    //const Jose = require("jose-jwe-jws").default;
    // Use SomeModule here

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jose = require('node-jose');
   
    console.log(key);
    console.log(key.e);
    console.log(bigIntToBase64(parseInt(key.e)));

    const hexModulus = convertModulus(key.n);

    console.log('Hexadecimal Modulus:', hexModulus.toString('hex'));
    const publicKey = await jose.JWK.asKey({
      kty: 'RSA',
      e: bigIntToBase64(parseInt(key.e)),  // Replace with your public key's exponent (e)
      n: hexModulus,  // Replace with your public key's modulus (n)
    }, 'RSA-OAEP');

    //const publicKey = await jose.JWK.asKey(key, 'pem');

    console.log(publicKey);

    const payload = {
      password: password,
    };

    // Encrypt the JSON object
    const encrypted = await jose.JWE.createEncrypt(
      { format: 'compact', fields: { alg: 'RSA-OAEP', enc: 'A256GCM' } },
      publicKey
    )
      .update(JSON.stringify(payload), 'utf8')
      .final();

    console.log('Encrypted Data:', encrypted.toString('base64'));

    return encrypted;
  },

  login: async (username: string, password: string): Promise<AuthUser> => {
    try {
      const response: AxiosResponse = await http.post(Auth.LOGIN, {
        username: username,
        password: password,
      });
      if (response) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        NotificationService(
          'Fail to Login',
          NotificationType.DANGER,
          error.response?.data.message
        );
        return null;
      }
    }
    return null;
  },

  logOut: async () => {
    try {
      await http.delete(Auth.CLEAN);
    } catch (error) {
      if (error instanceof AxiosError) {
        NotificationService(
          'Fail To Logout',
          NotificationType.DANGER,
          error.response?.data.message
        );
      }
      return error;
    }
  },
};

export default AuthService;
