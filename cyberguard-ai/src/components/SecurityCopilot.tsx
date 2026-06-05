import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Terminal, AlertTriangle, ShieldCheck, CornerDownRight, Loader2, HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, URLScanResult, IPScanResult, NetworkAnalyzeResult } from '../types.js';

interface SecurityCopilotProps {
  phishingScans: URLScanResult[];
  ipScans: IPScanResult[];
  networkScans: NetworkAnalyzeResult[];
}

export default function SecurityCopilot({ phishingScans, ipScans, networkScans }: SecurityCopilotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "### Welcome to CyberGuard Security Copilot\n\nI am your dedicated virtual Security Operations Center (SOC) agent. I have loaded your current workspace telemetry metrics.\n\nAsk me anything about cybersecurity, core networks, defense overrides, or request diagnostic evaluations of your scanned results:\n\n* **\"Explain DDoS SYN Flood attacks\"**\n* **\"What is phishing and how do I mitigate it?\"**\n* **\"Summarize my current active threats\"**",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Suggested preset questions
  const suggestedQuestions = [
    "Explain DDoS connection floods.",
    "Why is secure-paypal-login.xyz highly dangerous?",
    "How do I secure open ports?",
    "What are lateral malware movements?"
  ];

  // Keep chat scrolled down
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isCopilotThinking]);

  // Formulate detailed context summaries of current scans to send to Gemini
  const compileContextSummary = () => {
    let summaryText = `Active scans count: URLs ${phishingScans.length}, IPs ${ipScans.length}, Netlog ${networkScans.length}.\n`;
    if (phishingScans.length > 0) {
      summaryText += `Phishing URL scans history:\n${phishingScans.map(s => `- URL: ${s.url}, Status: ${s.status}, Score: ${s.riskScore}/100`).join('\n')}\n`;
    }
    if (ipScans.length > 0) {
      summaryText += `IP scanning history:\n${ipScans.map(s => `- IP: ${s.ip}, Country: ${s.country}, Status: ${s.status}, Score: ${s.riskScore}/105`).join('\n')}\n`;
    }
    if (networkScans.length > 0) {
      summaryText += `Network logs history:\n${networkScans.map(s => `- File: ${s.fileName}, Status: ${s.status}, Score: ${s.riskScore}/100, Anomalies: ${s.anomaliesDetected.map(a => a.type).join(', ')}`).join('\n')}\n`;
    }
    return summaryText;
  };

  const submitQuery = async (query: string) => {
    if (!query.trim()) return;
    setUserInput('');

    // Add user message
    const updatedMessages = [
      ...messages,
      { role: 'user' as const, text: query, timestamp: new Date().toLocaleTimeString() }
    ];
    setMessages(updatedMessages);
    setIsCopilotThinking(true);

    try {
      const summaryContext = compileContextSummary();
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          contextInfo: summaryContext
        }),
      });

      if (!response.ok) throw new Error('Copilot endpoint returned an error.');

      const data = await response.json();
      setMessages([
        ...updatedMessages,
        { role: 'model', text: data.reply, timestamp: new Date().toLocaleTimeString() }
      ]);
    } catch (err) {
      console.error(err);
      // Fallback
      setMessages([
        ...updatedMessages,
        {
          role: 'model',
          text: "### Security Advisory Network Issue\n\nI encountered a connection timeout contacting the primary secure intelligence API. This occasionally occurs if the active pipeline is busy.\n\nEnsure that you check that the `GEMINI_API_KEY` is fully declared or review your local dashboard configurations to restart.",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsCopilotThinking(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="font-heading text-lg font-bold text-white sm:text-xl">CyberGuard Security Copilot</h2>
        <p className="mt-1 text-xs text-slate-400">
          Chat directly with our virtual Tier-3 SOC analyst. CyberGuard Copilot reviews your current live dashboard scan logs in real time to guide tactical remedying procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        
        {/* Suggested Queries panel */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 col-span-1 space-y-4">
          <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest block">SUGGESTED SOC QUERIES</span>
          
          <div className="space-y-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => submitQuery(q)}
                className="w-full text-left rounded-xl bg-slate-950/60 border border-slate-850 hover:border-slate-700 hover:bg-slate-950 p-3 transition flex items-start justify-between group"
              >
                <span className="text-xs text-slate-300 pr-2 leading-tight">{q}</span>
                <CornerDownRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition shrink-0 mt-0.5" />
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-slate-400 leading-normal">
            <span className="font-mono font-bold text-[9px] text-blue-450 uppercase flex items-center space-x-1.5 mb-1">
              <Sparkles className="h-3 w-3 text-blue-400 animate-pulse" />
              <span>ACTIVE CONTEXT AWARENESS</span>
            </span>
            <p className="text-[11px]">Any questions you ask our copilot about scanned URL records or suspicious IP geolocations will automatically search the live session metadata buffers.</p>
          </div>
        </div>

        {/* Conversation Chat panel */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 col-span-3 flex flex-col h-[520px]">
          
          {/* Scroll Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-5 pr-1 pb-4 scroll-smooth"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex space-x-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Agent Icon */}
                {msg.role === 'model' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.2)] text-white shrink-0">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}

                <div className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-605 bg-blue-600 border border-blue-500 text-white rounded-tr-none'
                    : 'bg-slate-950 border border-slate-850 text-slate-200 rounded-tl-none'
                }`}>
                  
                  {/* Markdown Renderer in correct design format */}
                  <div className="markdown-body">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>

                  <span className="text-[9px] font-mono mt-2.5 block text-slate-500 font-bold uppercase text-right">
                    {msg.timestamp}
                  </span>
                </div>

                {/* User avatar initial */}
                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 font-semibold uppercase shrink-0">
                    AN
                  </div>
                )}
              </div>
            ))}

            {isCopilotThinking && (
              <div className="flex justify-start space-x-3 text-xs text-slate-500">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0 animate-pulse">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="bg-slate-950 border border-slate-850 rounded-2xl rounded-tl-none p-4 flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                  <span className="font-mono text-[10px] uppercase">Copilot is formatting mitigation recommendation...</span>
                </div>
              </div>
            )}
          </div>

          {/* Form input field */}
          <form 
            onSubmit={(e) => { e.preventDefault(); submitQuery(userInput); }}
            className="flex items-center space-x-2 border-t border-slate-800 pt-4"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
              placeholder="Ask Copilot: 'Explain DDoS floods' or request active threat details..."
              disabled={isCopilotThinking}
              id="chat-input"
            />
            <button
              type="submit"
              disabled={isCopilotThinking || !userInput.trim()}
              className="rounded-xl bg-blue-600 hover:bg-blue-500 p-3 text-white transition-all disabled:bg-slate-800 flex items-center justify-center h-11 w-11 shrink-0"
              id="send-chat-btn"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
