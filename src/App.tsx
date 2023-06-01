// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { useState } from 'react'
import Message from './components/message/Message'
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';


function App() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([{
    message: "Comment puis-je vous aider ?",
    avatar: "B",
    side: "left"
  }]);

  const mutation = useMutation((question) =>
    axios.post("http://82.165.79.190/query", { question: question }), {
      onSuccess: (data) => {
        console.log(data.data);
        setConversation((prev)  => [...prev, {message: data.data.answer, avatar: "B", side: "left"}]);
      }
    }
  );

  const getPdfTitle = () => {
   return axios.get("http://82.165.79.190/current_title");
  }

  const pdfTitle = useQuery("pdfTitle", getPdfTitle);

  const handleSubmit = () => {
    if(!question) return;
    setConversation((prev)  => [...prev, {message: question, avatar: "Y", side: "right"}]);
    setQuestion("");
    mutation.mutate(question);
  };


  if(pdfTitle.data) {
    console.log(pdfTitle.data);
  }

  return (
    <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div
                className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">Chat To PDF</div>
            </div>
        
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs mt-6">
                <span className="font-bold">PDF acutel :</span>
                
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2">
                <button
                  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                >
                  <div className="ml-2 text-sm font-semibold">{pdfTitle.data ? pdfTitle.data.data.title : "Aucun pdf n'est chargé"}</div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div
              className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            >
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {
                      conversation.map((message, index) => {
                        return <Message key={index} message={message.message} avatar={message.avatar} side={message.side}/>
                      })
                    }
                  </div>
                </div>
              </div>
              <div
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
              >
                
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    disabled={pdfTitle.isError}
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
