import React from 'react'
import ReactMarkdown from 'react-markdown'

const AiMessage = ({ message }) => {
  return (
    <div className="flex gap-5">
      <div className="w-8 h-8 rounded bg-[#1C1C1F] flex items-center justify-center shrink-0 border border-white/5 mt-0.5">
        <svg className="w-4 h-4 text-[#26a0da]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
          Monolith AI
        </span>

        {/* ✅ Markdown rendering */}
        <div className="text-gray-300 leading-relaxed text-[15px] pl-1">
          <ReactMarkdown
            components={{
              p: ({node, ...props}) => <p className="mb-2" {...props} />,
              li: ({node, ...props}) => <li className="ml-4 list-disc" {...props} />,
              code: ({node, inline, ...props}) =>
                inline ? (
                  <code className="bg-gray-800 px-1 rounded" {...props} />
                ) : (
                  <code className="block bg-gray-900 p-3 rounded-lg overflow-x-auto" {...props} />
                ),
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default AiMessage