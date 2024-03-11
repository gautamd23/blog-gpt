import React, { useState } from "react";
import axios from "axios";

export default function () {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [toggleLogin, setToggleLogin] = useState(true);

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
      const response = await axios.post(
        "http://localhost:4000/signup",
        formDataJSON,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      resetForm();
    } catch (error) {
      console.log(error);
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
          className="flex flex-col gap-3  bg-white py-14 px-10 rounded-lg"
        >
          <input
            className="outline-none bg-slate-100 py-2 px-2 rounded-lg"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          ></input>
          {toggleLogin && (
            <input
              className="outline-none bg-slate-100 py-2 px-2 rounded-lg"
              type="email"
              placeholder="Eamil"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          )}
          <input
            className="outline-none bg-slate-100 py-2 px-2 rounded-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
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
