import React from 'react'

const HumanMessage = ({ message }) => {
  return (
     <div className="flex gap-5 flex-row-reverse mt-4">
              <div className="flex flex-col gap-2 items-end w-full max-w-[85%]">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pr-1">You</span>
                <div className="bg-[#1C1C1F] border border-white/5 text-gray-200 px-6 py-4 rounded-2xl rounded-tr-sm leading-relaxed text-[15px]">
                  {message}
                </div>
              </div>
            </div>
  )
}

export default HumanMessage
