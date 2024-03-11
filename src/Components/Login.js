import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [toggleLogin, setToggleLogin] = useState(true);
  const [loginError, setLoginError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    try {
      const formDataJSON = JSON.stringify(formData);
      console.log("Form Data JSON:", formDataJSON);
      console.log(toggleLogin);
      if (toggleLogin) {
        const response = await axios.post(
          "http://localhost:4000/signup",
          formDataJSON,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("login");
        console.log(response.data);
      } else {
        const response = await axios.post(
          "http://localhost:4000/login",
          formDataJSON,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console
        
        console.log(response.data);
        if(response.data ==="OK") {
         setLoggedIn(true)
          navigate("/post");
          console.log("logged in..");
        } else {
          
          
        }
        
      }

      resetForm();
    } catch (error) {
      console.log(error.response.data.error);
      setLoginError(error.response.data.error)
    }
  }
  function resetForm() {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  }
  
  return (
    <div className="flex justify-center items-center bg-black h-screen">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3  bg-white py-8 px-10 rounded-lg"
        >
          <input
            className="outline-none  py-2 px-2  border-b-2"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          ></input>
          {toggleLogin && (
            <input
              className="outline-none  py-2 px-2  border-b-2"
              type="email"
              placeholder="Eamil"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          )}
          <input
            className="outline-none py-2 px-2  border-b-2"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
          <p className="text-red-600 text-xs ">{loginError}</p>
          <button
            type="submit"
            className="py-1 px-6 bg-red-600 rounded-lg text-white mt-4"
          >
            {toggleLogin ? "Sign Up" : "Login"}
          </button>
          <p className="text-xs">
            {toggleLogin ? "Already have an account?" : "New User?"}{" "}
            <span
              className="font-bold text-xs cursor-pointer"
              onClick={() => setToggleLogin(!toggleLogin)}
            >
              {toggleLogin ? "Login" : "Register Here"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
