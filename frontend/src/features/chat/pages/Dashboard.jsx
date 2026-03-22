import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChat } from '../hooks/useChat';
import { setLoading } from '../chat.slice';
import HumanMessage from '../components/HumanMessage';
import AIMessage from '../components/AiMessage';
const Dashboard = () => {
  const { initializeSocket, handleChatMessage } = useChat();
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState('');
  const chats = useSelector((state) => state.chat.chats);

  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    initializeSocket();
  }, [user, initializeSocket]);

  async function handleInput(e) {
    e.preventDefault();
    console.log("called")
    if (input.trim()) {
      await handleChatMessage({ message: input, chatId: currentChatId });
      setInput('');
    }
  }
  return (
    <div className="flex h-screen bg-[#0e0e10] text-gray-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#121214] flex flex-col border-r border-white/5 justify-between shrink-0">
        <div className="p-4 flex flex-col gap-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-2 mt-2">
            <div className="w-8 h-8 rounded-lg bg-[linear-gradient(to_right,#314755_0%,#26a0da_51%,#314755_100%)] bg-[length:200%_auto] flex items-center justify-center shadow-lg shadow-[#26a0da]/20 hover:bg-right transition-all duration-500">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-sm tracking-wide">Digital Monolith</h1>
              <p className="text-[9px] text-gray-500 tracking-widest font-semibold mt-0.5">PREMIUM AI INTERFACE</p>
            </div>
          </div>

          {/* New Chat Button */}
          <button className="flex items-center justify-center gap-2 bg-[linear-gradient(to_right,#314755_0%,#26a0da_51%,#314755_100%)] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-md shadow-[#26a0da]/20 text-white py-2.5 rounded-xl text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>

          {/* Navigation */}
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-[10px] font-bold text-gray-600 px-3 mb-2 tracking-widest uppercase">History</p>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 flex flex-col gap-1 pb-6">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-400 text-sm font-medium transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-400 text-sm font-medium transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>

          <div className="mt-3 bg-[#18181B] rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-[#222226] transition-colors border border-white/5">
            <div className="w-9 h-9 rounded-full bg-[#fca5a5] flex items-center justify-center text-red-900 font-bold text-sm shrink-0">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-gray-200 text-sm font-medium truncate">{user?.username || 'Alex Sterling'}</p>
              <p className="text-[11px] text-gray-500 font-medium">Pro Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0e0e10]">
        {/* Top Header */}
        <header className="h-[72px] flex items-center justify-between px-8 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-8">
            <h2 className="text-white font-semibold text-lg">Monolith AI</h2>
            <nav className="flex items-center gap-8 h-full pt-1">
              <button className="text-emerald-400 text-[13px] font-bold border-b-2 border-emerald-400 h-[72px] uppercase tracking-wider relative top-[1px]">
                GPT-4O
              </button>
              <button className="text-gray-500 hover:text-gray-300 transition-colors text-[13px] font-bold h-[72px] uppercase tracking-wider">
                Claude 3.5
              </button>
              <button className="text-gray-500 hover:text-gray-300 transition-colors text-[13px] font-bold h-[72px] uppercase tracking-wider">
                Gemini Pro
              </button>
            </nav>
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
       <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col gap-10 scroll-smooth pb-[15rem]">
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-10">
            {console.log("Chats object:", chats)}
             { console.log("Current chat id:", currentChatId)}
             { console.log("Current chat:", chats[currentChatId])}
            {chats[currentChatId]?.messages.map((msg, index) =>

              msg.role === "user" ? (
                <HumanMessage key={index} message={msg.content} />
              ) : (
                <AIMessage key={index} message={msg.content} />
              )
            )}
          </div>
        </div>

        {/* Message Input Form (Fixed at bottom) */}
        <div className="absolute bottom-0 w-[calc(100%-260px)] right-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10] to-transparent pt-10 pb-6 px-6 md:px-10 z-10">
          <div className="max-w-3xl mx-auto">
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

            {/* Bottom info text */}
            <div className="flex justify-center items-center gap-8 mt-5 text-[10px] uppercase font-bold tracking-widest text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" /></svg>
                <span>Context: On</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span>Privacy: High</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
