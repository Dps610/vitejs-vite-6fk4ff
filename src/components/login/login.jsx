import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';  
import { yupResolver } from '@hookform/resolvers/yup';  
import { useNavigate } from 'react-router-dom';
import './index.css';

const schema = yup.object().shape({
  user_email: yup.string().email('Invalid email').required('Email is required'),
  user_password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://syoft.dev/Api/userlogin/api/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/dashboard');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Log In</h2>
        <input {...register('user_email')} placeholder="Email" />
        {errors.user_email && <p className="error">{errors.user_email.message}</p>}
        
        <input {...register('user_password')} type="password" placeholder="Password" />
        {errors.user_password && <p className="error">{errors.user_password.message}</p>}
        
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;


