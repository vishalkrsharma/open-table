'use client';

import { ChangeEvent, useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInput from './AuthModalInput';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '@/contexts/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ isSignin }: { isSignin: boolean }) => {
  const [open, setOpen] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  useEffect(() => {
    const { firstName, lastName, email, phone, city, password } = userData;

    if (isSignin) {
      if (email && password) {
        return setDisabled(false);
      }
    } else {
      if (firstName && lastName && email && phone && city && password) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [userData]);

  const { signin, signup } = useAuth();
  const { loading, data, error } = useContext(AuthenticationContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const numericValue = value.replace(/[^0-9]/g, '');

    setUserData((prev) => ({
      ...prev,
      phone: numericValue,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, city, phone, password } = userData;

    if (isSignin) {
      signin({ email, password }, handleClose);
    } else {
      signup(
        {
          firstName,
          lastName,
          email,
          password,
          phone,
          city,
        },
        handleClose
      );
    }
  };

  return (
    <div>
      <button
        className={`${renderContent('bg-blue-400 text-white', '')} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContent('Sign in', 'Sign up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {loading ? (
            <div className='flex items-center justify-center p-2 h-[400px]'>
              <CircularProgress />
            </div>
          ) : (
            <div className='p-2 h-[400px]'>
              <div className='uppercase font-bold text-center pb-2 border-b mb-2'>
                <p className='text-md'>{renderContent('Sign in', 'Create account')}</p>
                <p>{data?.firstName}</p>
              </div>
              <div className='m-auto'>
                <h2 className='text-2xl font-light text-center'>{renderContent('Log into your account', 'Create your OpenTable account')}</h2>
                <AuthModalInput
                  userData={userData}
                  handleChange={handleChange}
                  handlePhoneChange={handlePhoneChange}
                  isSignin={isSignin}
                />
                <button
                  className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
                  onClick={handleSubmit}
                  disabled={disabled}
                >
                  {renderContent('Sign in', 'Create  account')}
                </button>
              </div>
              {error ? (
                <Alert
                  severity='error'
                  className='mb-4'
                >
                  {error}
                </Alert>
              ) : null}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
