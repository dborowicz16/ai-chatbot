"use client";
import React, { useEffect, useReducer } from 'react';
import * as webllm from "@mlc-ai/web-llm";

function App() {
  // I know the typing is a hack, but I wanna implement this quickly
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case 'initialized':
        return { ...state, response: action.payload }
      case 'response':
        return { ...state, response: action.payload }
      case 'prompt':
        return { ...state, prompt: action.payload }
      case 'promtCompletion':
        return { ...state, promptCompletion: action.payload }
      default:
        return state;
    }
  }, {
    initialized: false,
    response: '',
    prompt: '',
    promptCompletion: false,
  });

  // Public variables for the component
  const { initialized, response, prompt, promptCompletion } = state;

  // Since no imports or additional sources are needed to initialize the chat module, we can initialize it here and have it more directly accessible for scoped interactions
  const chat = new webllm.ChatModule();
  initializeChatModule();

  async function initializeChatModule() {
    chat.setInitProgressCallback((report) => {
      dispatch({ type: 'response', payload: report.text });
    });
  }

  async function makePrompt() {
    const reply = await chat.generate(prompt);
    dispatch({ type: 'response', payload: reply });
  }



  return (
    <div className="flex flex-col">      
      {/* Switched to utilizing Shadow DOM for improved performance */}
      <p className='text-white'>
        {response}
      </p>
      <input className="text-yellow" type="text" id="prompt" value={prompt} onChange={(e) => dispatch({ type: 'prompt', payload: e.target.value })} />
    </div>
  );
}

export default App;
