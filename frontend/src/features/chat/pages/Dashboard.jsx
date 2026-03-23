import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChat } from '../hooks/useChat';
import HumanMessage from '../components/HumanMessage';
import AIMessage from '../components/AiMessage';
import { setAllChats, setAllMessage, setChatId ,setTitle,setisImage} from '../chat.slice';
import { useDispatch } from 'react-redux';
import { getChats, getMessages } from '../services/chat.api';
import Sidebar from '../components/Sidebar';
const Dashboard = () => {
  const dispatch = useDispatch()
  const { initializeSocket, handleChat ,handlegenerateImage} = useChat();
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState('');
  // const [isImage, setisImage] = useState(false)
  const { messages, chatId, title, AllChats,isImage } = useSelector((state) => state.chat);
const [isClicked, setIsClicked] = useState(false);

  async function handleInput() {
    if(isImage){
      await handlegenerateImage({prompt:input,chatId}) 
      return
    }
    await handleChat({ message: input, chatId })
  }
 
  const handleClick = () => {
       setIsClicked(!isClicked);
    dispatch(setisImage(!isImage))
   
  };
  useEffect(() => {
    initializeSocket();
  }, [user, initializeSocket]);
  useEffect(() => {
    const fetchChats = async () => {
      const res = await getChats();
      dispatch(setAllChats(res.chats));
    };

    fetchChats();
  }, [messages])


  return (
    <div className="flex h-screen bg-[#0e0e10] text-gray-300 font-sans overflow-hidden">
     <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#0e0e10]">
        {/* Top Header */}
        <header className="h-[72px] flex items-center justify-between px-8 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-8">
            <h2 className="text-white font-semibold text-lg">Monolith AI</h2>
          </div>

          <div className="flex items-center gap-5">
            <button className="bg-[linear-gradient(to_right,#314755_0%,#26a0da_51%,#314755_100%)] bg-[length:200%_auto] hover:bg-right text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest transition-all duration-500 shadow-lg shadow-[#26a0da]/20">
              UPGRADE
            </button>
            <div className="w-px h-6 bg-white/10 mx-1"></div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </header>
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col gap-10 scroll-smooth">
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-10">

            <h1>{title}</h1>


            {messages.map(function (msg) {
              // console.log(msg)
              console.log(msg)
              return (msg.role === 'user' ? <HumanMessage message={msg.message || msg.content} /> : <AIMessage message={msg.message || msg.content} type={msg.type} />)
            })}


          </div>
        </div>
        {/* Message Input (fixed at bottom as shrink-0 flex child) */}
        <div className="shrink-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10] to-transparent pt-4 pb-6 px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            {/* Create Images toggle */}
            <div className="flex justify-end mb-3">
              <div
                onClick={handleClick}
                className={`h-10 w-44 bg-gray-800 text-white rounded-xl shadow-lg
                  flex items-center justify-center gap-2 cursor-pointer
                  transition-all duration-100 ease-in-out
                  ${isClicked ? 'scale-95 bg-green-700 shadow-inner' : 'hover:bg-gray-700 active:scale-95'}
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
                </svg>
                <h3 className="text-sm font-semibold select-none">Create Images</h3>
              </div>
            </div>

            <div className="relative bg-[#1A1A1D] border border-white/10 rounded-2xl flex items-center shadow-2xl transition-all focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10">
              <button className="pl-5 pr-3 py-4 text-gray-500 hover:text-gray-300 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              <input
                type="text"
                className="flex-1 bg-transparent border-none text-gray-200 text-[15px] py-4 placeholder-gray-500 focus:outline-none focus:ring-0"
                placeholder="Message Monolith AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <button className="px-3 py-4 text-gray-500 hover:text-gray-300 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              <div className="pr-3 pl-1">
                <button onClick={handleInput}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 shadow-md ${input.trim() ? 'bg-[linear-gradient(to_right,#314755_0%,#26a0da_51%,#314755_100%)] bg-[length:200%_auto] hover:bg-right text-white' : 'bg-white/5 text-gray-500 cursor-default hover:bg-white/10'}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center gap-8 mt-5 text-[10px] uppercase font-bold tracking-widest text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" /></svg>
                <span>Ai Can Make Mistakes. Check Important Info</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
