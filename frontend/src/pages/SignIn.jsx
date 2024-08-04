import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

export const SignInOfficer = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/officer/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, username: username, password: password, number:number , adhaar : adhaar })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.token){
        localStorage.setItem('token', data.token);
        navigate('/officerdashboard');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <motion.div className="flex flex-col items-center justify-center px-6 pt-4 mx-auto h-[80vh]"
    initial={{y:-100 ,opacity:0}}
    animate={{y: -10,opacity:1}}
    transition={{delay:0.2 , type: 'spring' , stiffness:120}}>
      <div className="w-[530px] bg-white rounded-lg border md:mt-0 xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to Officer
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <motion.div
            whileHover={{
              scale:1.04,
              textShadow: "0px 0px 8px rgb(255 255 255)",
              boxShadow:"0px 0px 8px rgb(255 255 255)" }}>
              <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900">Enter Your Name</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="text"
                id="Name"
                placeholder="Enter Your Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </motion.div>
            <motion.div
            whileHover={{
              scale:1.04,
              textShadow: "0px 0px 8px rgb(255 255 255)",
              boxShadow:"0px 0px 8px rgb(255 255 255)" }}>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your ehhhhhhhhhmail</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </motion.div>
            <motion.div
            whileHover={{
              scale:1.04,
              textShadow: "0px 0px 8px rgb(255 255 255)",
              boxShadow:"0px 0px 8px rgb(255 255 255)" }}>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">number</label>
              <input
                onChange={(e) => setNumber(e.target.value)}
                type="text"
                name="number"
                id="number"
                placeholder="Enter Your Phone Number"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </motion.div>
            <motion.div
            whileHover={{
              scale:1.04,
              textShadow: "0px 0px 8px rgb(255 255 255)",
              boxShadow:"0px 0px 8px rgb(255 255 255)" }}>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Adhaar</label>
              <input
                onChange={(e) => setAdhaar(e.target.value)}
                type="text"
                name="adhaar"
                id="adhaar"
                placeholder="Enter your Adhaar Number"
                className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </motion.div>
            <motion.div
            whileHover={{
              scale:1.04,
              textShadow: "0px 0px 8px rgb(255 255 255)",
              boxShadow:"0px 0px 8px rgb(255 255 255)" }}>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="********"
                className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </motion.div>
            <div className="flex items-center justify-center">
              <motion.button
                whileHover={{
                  scale:1.2,
                  textShadow: "0px 0px 8px rgb(255 255 255)",
                }}
                type="submit"
                className="text-white w-28 bg-blue-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </motion.button>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <a href="/cleanerlogin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
