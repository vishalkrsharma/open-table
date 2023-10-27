import { AuthenticationContext } from '@/contexts/AuthContext';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useContext } from 'react';

const useAuth = () => {
  const { loading, data, error, setAuthState } = useContext(AuthenticationContext);
  const [cookie, setCookie, removeCookie] = useCookies(['jwt']);

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const res = await axios.post('/api/auth/signin', {
        email,
        password,
      });
      setAuthState({
        data: res.data,
        error: null,
        loading: false,
      });
      console.log(res);
      setCookie('jwt', res.data.token, {
        path: '/',
        maxAge: 3600 * 24, // Expires after 1hr
        sameSite: true,
      });
      handleClose();
    } catch (err: any) {
      setAuthState({
        data: null,
        error: err.response.data.message,
        loading: false,
      });
    }
  };

  const signup = async (
    {
      firstName,
      lastName,
      email,
      password,
      phone,
      city,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phone: string;
      city: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const res = await axios.post('/api/auth/signup', {
        firstName,
        lastName,
        email,
        password,
        phone,
        city,
      });
      setAuthState({
        data: res.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (err: any) {
      setAuthState({
        data: null,
        error: err.response.data.message,
        loading: false,
      });
    }
  };

  const signOut = () => {
    removeCookie('jwt');
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return { signin, signup, signOut };
};

export default useAuth;
