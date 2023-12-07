'use client';

import Image from 'next/image';
import ParthImage from '@/../public/parth.JPG';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = 'Email is Required';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is Required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.ok) {
          toast(response.message, {
            type: 'success',
            position: 'top-right',
            autoClose: 2000,
          });

          checkLogin();
        } else {
          toast(response.message, {
            type: 'error',
            position: 'top-right',
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        toast(error.message, {
          type: 'error',
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };

  const checkLogin = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.ok) {
          router.push('/dashboard');
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center px-3">
      <div className="rounded-3xl overflow-hidden shadow-2xl w-full">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <Image
              src={ParthImage}
              className="w-[100%] lg:h-[610px] md:h-[800px] sm:h-[400px] h-full"
              alt="logo"
            />
          </div>
          <div className="flex-1  flex justify-center items-center">
            <form
              className="w-[100%] max-w-[450px] py-4 px-2"
              onSubmit={handleSubmit}
            >
              <div className="">
                <h1 className="text-3xl font-semibold mb-10">
                  Login to your Account
                </h1>
                <div className="flex flex-col mb-5">
                  <label className="text-[18px] text-gray-500">Email</label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="border outline-none p-2"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <span className="formerror text-red-600">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-5">
                  <label className="text-[18px] text-gray-500">Password</label>
                  <input
                    type="text"
                    placeholder="Enter your password"
                    className="border outline-none p-2"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="formerror  text-red-600">
                      {errors.password}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-purple-900 text-white font-semibold text-[18px] tracking-wider py-2 mt-6"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
