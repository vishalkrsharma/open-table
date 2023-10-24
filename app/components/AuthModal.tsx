'use client';

import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInput from './AuthModalInput';
import validator from 'validator';

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

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
    if (!validator.isEmail(userData.email)) {
      setError('Email not valid');
      return;
    }

    if (!validator.isNumeric(userData.phone) || !validator.isMobilePhone(userData.phone)) {
      setError('Phone number not valid');
      return;
    }
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      password: '',
    });
    setError('');
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
          <div className='p-2 '>
            <div className='uppercase font-bold text-center pb-2 border-b mb-2'>
              <p className='text-md'>{renderContent('Sign in', 'Create account')}</p>
            </div>
            <div className='m-auto'>
              <h2 className='text-2xl font-light text-center'>{renderContent('Log into your account', 'Create your OpenTable account')}</h2>
              <div className='h-[400px] flex flex-col justify-between'>
                <AuthModalInput
                  userData={userData}
                  handleChange={handleChange}
                  handlePhoneChange={handlePhoneChange}
                  isSignin={isSignin}
                />
                <div className='text-red-600'>{error}</div>
                <button
                  className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
                  onClick={handleSubmit}
                >
                  {renderContent('Sign in', 'Create  account')}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
