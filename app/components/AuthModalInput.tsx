import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

interface Props {
  userData: UserData;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

const AuthModalInput = ({ userData, handleChange, handlePhoneChange, isSignin }: Props) => {
  return (
    <div>
      {isSignin ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            className='border rounded p-2 py-3 w-[49%]'
            type='text'
            placeholder='First Name'
            value={userData.firstName}
            name='firstName'
            onChange={handleChange}
          />
          <input
            className='border rounded p-2 py-3 w-[49%]'
            type='text'
            placeholder='Last Name'
            value={userData.lastName}
            name='lastName'
            onChange={handleChange}
          />
        </div>
      )}
      <div className='my-3 flex justify-between text-sm'>
        <input
          className='border rounded p-2 py-3 w-full'
          type='text'
          placeholder='Email'
          value={userData.email}
          name='email'
          onChange={handleChange}
        />
      </div>
      {isSignin ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            className='border rounded p-2 py-3 w-[49%]'
            type='text'
            inputMode='numeric'
            placeholder='Phone Number'
            value={userData.phone}
            name='phone'
            onChange={handlePhoneChange}
          />
          <input
            className='border rounded p-2 py-3 w-[49%]'
            type='text'
            placeholder='City'
            value={userData.city}
            name='city'
            onChange={handleChange}
          />
        </div>
      )}
      <div className='my-3 flex justify-between text-sm'>
        <input
          className='border rounded p-2 py-3 w-full'
          type='password'
          placeholder='Password'
          value={userData.password}
          name='password'
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AuthModalInput;
