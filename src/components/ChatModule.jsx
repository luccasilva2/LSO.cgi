import React, { useEffect, useRef } from 'react';

const ChatModule = ({
    messages,
    inputValue,
    setInputValue,
    handleSend,
    isModularMode,
    activeDragElement,
    position,
    width = 672, // default max-w-2xl
    height,
    onMouseDown
}) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div
            id="chat"
            onMouseDown={onMouseDown}
            className={`absolute px-6 py-4 pointer-events-auto transition-all duration-200 
            backdrop-blur-xl bg-slate-950/55 border border-cyan-100/10 shadow-2xl rounded-2xl
            ${isModularMode ? (activeDragElement === 'chat' ? 'ring-2 ring-green-500' : 'ring-1 ring-yellow-500/30') : ''}
        `}
            style={{
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, 0)', // Aligned top-center
                width: width,
                height: height
            }}
        >
            <div className="absolute inset-0 app-bg-noise opacity-15 pointer-events-none"></div>

            <div
                className="flex flex-col gap-3 overflow-y-auto mb-4 scrollbar-hide mask-image-gradient relative z-10"
                style={{ height: height ? `calc(${height}px - 70px)` : '15rem' }}
            >
                {messages.slice(-8).map((msg, i) => (
                    <div key={i} className="text-sm border border-cyan-500/15 bg-black/20 rounded-lg px-3 py-2">
                        <span className="text-cyan-300/70 ui-mono text-[11px]">[{msg.time}]</span> <span className="font-semibold text-cyan-100">{msg.sender}</span>
                        <div className="text-slate-200 mt-1 leading-relaxed">{msg.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2 relative z-10 absolute bottom-4 left-6 right-6">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleSend}
                    placeholder="Type your command..."
                    className="flex-1 bg-black/35 border border-cyan-200/15 rounded-lg p-3 text-cyan-50 focus:outline-none focus:border-cyan-300/60 focus:ring-1 focus:ring-cyan-300/40 transition-all placeholder-cyan-100/35 backdrop-blur-sm"
                />
            </div>
            {isModularMode && <div className={`absolute -top-6 left-0 text-xs font-bold tracking-widest ${activeDragElement === 'chat' ? 'text-green-500' : 'text-yellow-500/50'}`}>CHAT MODULE</div>}
        </div>
    );
};

export default ChatModule;
