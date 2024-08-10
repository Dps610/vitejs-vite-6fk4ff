import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './index.css';

const schema = yup.object().shape({
  user_firstname: yup.string().required('First name is required'),
  user_email: yup.string().email('Invalid email').required('Email is required'),
  user_password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  user_phone: yup.string().required('Phone number is required'),
});

function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      user_lastname: 'Doe',
      user_city: 'Hyderabad',
      user_zipcode: '500072',
    };

    try {
      const response = await fetch('https://syoft.dev/Api/user_registeration/api/user_registeration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h2>Sign Up</h2>
        <input {...register('user_firstname')} placeholder="First Name" />
        {errors.user_firstname && <p className="error">{errors.user_firstname.message}</p>}
        
        <input {...register('user_email')} placeholder="Email" />
        {errors.user_email && <p className="error">{errors.user_email.message}</p>}
        
        <input {...register('user_password')} type="password" placeholder="Password" />
        {errors.user_password && <p className="error">{errors.user_password.message}</p>}
        
        <input {...register('user_phone')} placeholder="Phone Number" />
        {errors.user_phone && <p className="error">{errors.user_phone.message}</p>}
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;

