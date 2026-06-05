import React, { useEffect, useRef } from 'react';
import { Shield, Sparkles, AlertTriangle, Radio, HelpCircle, Activity, Globe, Send, Terminal, Cpu } from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: () => void;
  onStartDemo: () => void;
}

export default function LandingPage({ onStartAnalysis, onStartDemo }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic Background Cyber Nodes Grid on Canvas!
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 500);

    // Points parameters
    const points: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const numPoints = 25;

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.8 ? '#EF4444' : '#2563EB' // malware spots and normal spots
      });
    }

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 500;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw lines between nearby dots
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.15 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }

      // Draw and move points
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.color === '#EF4444' ? 10 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Motion update
        p.x += p.vx;
        p.y += p.vy;

        // Boundaries checks
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#0F172A] pt-12 pb-20 sm:pb-28">
      
      {/* Dynamic Cyber Grid Visualizer on Backing */}
      <div className="absolute inset-0 z-0 opacity-44 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0F172A] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Alerts Tick Banner */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-blue-500/20 bg-blue-600/10 px-4 py-1.5 text-xs text-blue-400 font-medium tracking-tight animate-bounce">
            <Sparkles className="h-4 w-4" />
            <span>CyberGuard AI Proactive Engine Active</span>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="mt-8 text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
            AI-Powered <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-400">
              Cyber Threat Detection
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Protect systems from phishing, malicious IPs, and suspicious network activity using AI. Designed for security analysts, students, enterprise gateways, and SOC administrators.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartAnalysis}
              className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Shield className="h-4.5 w-4.5" />
              <span>Start Analysis Console</span>
            </button>
            
            <button
              onClick={onStartDemo}
              className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-800 bg-opacity-40 px-8 py-4 text-sm font-bold text-slate-200 hover:border-slate-500 hover:bg-slate-800/80 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Terminal className="h-4.5 w-4.5 text-blue-500" />
              <span>Explore Live Demo Gateway</span>
            </button>
          </div>
        </div>

        {/* Core System Features Grid */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="bento-card bg-slate-900/40 cursor-pointer">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Globe className="h-5.5 w-5.5" />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-white">URL Phishing Scanning</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Examine suspicious links with standard machine learning heuristic profiles, keyword tracking, and age evaluation.
            </p>
          </div>

          <div className="bento-card bento-card-emerald bg-slate-900/40 cursor-pointer">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Activity className="h-5.5 w-5.5" />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-white">IP Reputation Intel</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Map originating network parameters against high volatility country hosting listings and blacklist caches.
            </p>
          </div>

          <div className="bento-card bento-card-amber bg-slate-900/40 cursor-pointer">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Cpu className="h-5.5 w-5.5" />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-white">Log Flows Parser</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Feed CSV firewall log files or PCAP network lists to automatically identify SYN floods, brute forces, or bot leaks.
            </p>
          </div>

          <div className="bento-card bg-slate-900/40 cursor-pointer hover:border-purple-500/40! hover:shadow-[0_0_25px_rgba(168,85,247,0.08)]!">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Sparkles className="h-5.5 w-5.5" />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-white">Cyber Security Copilot</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Activate our Gemini SOC assistant to receive plain English threat explanations and rapid remediation scripts.
            </p>
          </div>

        </div>

        {/* Real-time Threat Map Simulation Banner */}
        <div className="mt-16 bento-card bg-gradient-to-r from-[#0d121f]/90 via-[#0a0e1a]/90 to-[#0c1a35]/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-left">
              <span className="font-mono text-xs uppercase text-blue-500 tracking-widest font-semibold flex items-center space-x-1.5">
                <Radio className="h-3 w-3 text-blue-400 animate-pulse shrink-0" />
                <span>INTEGRATIVE INTEL REPORTING</span>
              </span>
              <h2 className="mt-2.5 font-heading text-xl font-bold text-white sm:text-2xl">
                Real-Time Threat Visualization
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Modern cybersecurity requires contextual summaries. Export formatted PDF Security Reports or evaluate risks dynamically with the integrative security copilot chat panel.
              </p>
            </div>
            <div className="flex space-x-3 shrink-0">
              <div className="text-center rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 min-w-[100px] hover:border-blue-500/30 transition-all">
                <p className="text-xl font-mono font-bold text-blue-500">99.8%</p>
                <p className="text-[10px] text-slate-400 uppercase mt-1">Detection ACC</p>
              </div>
              <div className="text-center rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 min-w-[100px] hover:border-rose-500/30 transition-all">
                <p className="text-xl font-mono font-bold text-rose-500">&lt;2s</p>
                <p className="text-[10px] text-slate-400 uppercase mt-1">Scan Latency</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
