import React, { useState } from "react";
import openai from "../utils/openai";
import axios from "axios";

export default function Form() {
  const [inputText, setInputText] = useState("");
  const [generatedPosts, setGeneratedPosts] = useState([]);

  async function handleGeneratePost() {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/generate",
        {
          prompt: inputText,
        }
      );
      setGeneratedPosts(response.data.generatedPost);
    } catch (error) {
      console.error("Error generating post:", error.message);
    }
  }

  return (
    <div>
      <h1>New Post </h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></input>
      <button
        className="w-full py-3 px-6 bg-green-600 rounded-lg text-white"
        onClick={handleGeneratePost}
      >
        Generate post
      </button>
    </div>
  );
}
