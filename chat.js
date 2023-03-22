import React, { useState } from "react";
import openai from "openai";

const OpenAIExample = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Generate system prompt
    const prompt = `Your name is Jarvis, you help students. ${messages.map((message) => message.text).join("\n")}\n${input}`;

    // Call the OpenAI API to generate a response
    const response = await openai.completions.create({
      engine: "davinci",
      prompt,
      maxTokens: 100,
      n: 1,
      stop: "\n",
    });

    // Set the output to the generated response
    setOutput(response.data.choices[0].text);

    // Add the user input to the messages
    setMessages([...messages, { author: "user", text: input }]);

    // Clear the input field
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.author}: {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input type="text" value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
      {output && <div>System: {output}</div>}
    </div>
  );
};

export default OpenAIExample;
