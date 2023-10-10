"use client";
import React, { useEffect } from 'react';
import * as webllm from "@mlc-ai/web-llm";

function App() {
  useEffect(() => {
    const setLabel = (id: string, text: string) => {
      const label = document.getElementById(id);
      if (label == null) {
        throw Error("Cannot find label " + id);
      }
      label.innerText = text;
    };

    const main = async () => {
      const chat = new webllm.ChatModule();

      chat.setInitProgressCallback((report) => {
        setLabel("init-label", report.text);
      });

      await chat.reload("RedPajama-INCITE-Chat-3B-v1-q4f32_0");

      const generateProgressCallback = (_step: any, message: any) => {
        setLabel("generate-label", message);
      };

      const prompt0 = "What is the capital of Canada?";
      setLabel("prompt-label", prompt0);
      const reply0 = await chat.generate(prompt0, generateProgressCallback);
      console.log(reply0);

      const prompt1 = "Can you write a poem about it?";
      setLabel("prompt-label", prompt1);
      const reply1 = await chat.generate(prompt1, generateProgressCallback);
      console.log(reply1);

      console.log(await chat.runtimeStatsText());
    };

    main();
  }, []);

  return (
    <div className="App">
      {/* Add your HTML elements here */}
      <div id="init-label"></div>
      <div id="generate-label"></div>
      <div id="prompt-label"></div>
    </div>
  );
}

export default App;
