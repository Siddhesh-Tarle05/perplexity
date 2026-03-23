import React from 'react'
import { setAllChats, setAllMessage, setChatId, setTitle } from '../chat.slice'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown'
import { getMessages } from '../services/chat.api';
const Sidebar = () => {
    const dispatch=useDispatch()
    const { messages, chatId, title, AllChats } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.auth);
    async function handleCreateNewChat() {
        dispatch(setAllMessage([]))
        dispatch(setChatId(null))
        dispatch(setTitle(null))
    }
    return (
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
                <button onClick={handleCreateNewChat} className="flex items-center justify-center gap-2 bg-[linear-gradient(to_right,#314755_0%,#26a0da_51%,#314755_100%)] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-md shadow-[#26a0da]/20 text-white py-2.5 rounded-xl text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    New Chat
                </button>

                {/* Navigation */}
                <div className="flex flex-col gap-2 mt-2">
                    <p className="text-[10px] font-bold text-gray-500 px-3 tracking-widest uppercase">
                        History
                    </p>

                    {AllChats && AllChats.map((chat) => (
                        <div onClick={async () => { dispatch(setChatId(chat._id)); let response = await getMessages(chat._id);  dispatch(setAllMessage(response.messages)) }} className="mx-2 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-200">
                            <ReactMarkdown>
                                {chat.title.replace(/[*_`"]/g, "")}
                            </ReactMarkdown>
                        </div>
                    ))}

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
    )
}

export default Sidebar
