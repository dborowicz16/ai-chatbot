import { useState } from "react";
import { ChatModule } from "@mlc-ai/web-llm";
import ChatUI from "./chat_ui";

const ChatComponent = () => {
  const [messages, setMessages] = useState<{ kind: string; text: string }[]>([]);
  const [prompt, setPrompt] = useState("");
  const [runtimeStats, setRuntimeStats] = useState("");
  const [chat_ui] = useState(new ChatUI(new ChatModule()));
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  const sendMessage = (message: string) => {
    const userPrompt = { kind: "right", text: message };
    chat_ui
      .onGenerate(message, (kind, text) => {
        setMessages([...messages, userPrompt, { kind, text }]);
      }, setRuntimeStats)
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 bg-[#020607] w-full flex justify-between items-center p-5">
        <img src="/whiteCowLogo.png" width="170px" height="65px" />
        {/* Switch */}
        <div className="switch-container" onClick={handleToggle}>
          <div className={`thumb ${checked ? 'checked' : ''}`}>
            {!checked &&
              <img src="/chatbotIcon.png" height="100%" width="100%" className="opacity-70" />
            }
            {checked &&
              <img src="/codeIcon.png" height="70%" width="70%" />
            }
          </div>
        </div>
      </div>

      {/* Chatbox */}
      <div className="flex flex-col items-center w-full h-full">
        <div className="chatui">
          <div className="chatui-chat" id="chatui-chat" >
            {/* Display messages */}
            {messages.map((value, index) => (
              <div key={index} className={`msg ${value.kind}-msg`}>
                <div className="flex flex-col items-center translate-y-7 mx-5">
                  <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                    {(value.kind === 'left' || value.kind === 'init' || value.kind === 'error') && (
                      <div>
                        <img src="/aiResponseIcon.png" className="h-6 w-10" />
                      </div>
                    )}

                  </div>
                  {(value.kind === 'left' || value.kind === 'init' || value.kind === 'error') && (
                    <p>CoW AI</p>
                  )}
                  {value.kind === 'right' &&
                    <p>You</p>
                  }
                </div>
                <div className="msg-bubble">
                  <div className="msg-text">{value.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="chatui-inputarea">
            <input
              id="chatui-input"
              type="text"
              className="chatui-input"
              placeholder="Enter your message..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage(prompt);
                  setPrompt(""); // Clear the input field
                }
              }}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)} />
            <button
              className="chatui-btn border-x-2 border-[#EFEFF0] border-solid"
              onClick={() => {
                sendMessage(prompt);
                setPrompt(""); // Clear the input field
              }}
            >
              Send
            </button>
            <button
              className="chatui-btn"
              onClick={() => {
                chat_ui.onReset(() => { }).catch((error) => console.log(error));
                setMessages([]); // Clear all messages
              }}
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
