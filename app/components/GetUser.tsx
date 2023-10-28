'use client';

import { AuthenticationContext } from '@/contexts/AuthContext';
import { User } from '@prisma/client';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';

interface UserResponse {
  data: any;
  error: any;
}

const GetUser = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  useEffect(() => {
    (async () => {
      const { data, error } = await getUser();

      if (error) {
        setAuthState({
          data: null,
          loading: false,
          error: error,
        });
      } else {
        setAuthState({
          data: data,
          loading: false,
          error: null,
        });
      }
    })();
  }, []);

  return null;
};

export default GetUser;

async function getUser(): Promise<UserResponse> {
  try {
    const res = await axios.get('/api/auth/me');

    return {
      data: res.data,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err.message,
    };
  }
}
