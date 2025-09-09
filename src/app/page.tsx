'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cloud, Cpu, Gamepad2, Terminal } from 'lucide-react';

export default function TerminalHostingDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '10';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      if (!canvas || !ctx) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#a3a3a3';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 500);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-neutral-300 mb-8 animate-pulse" style={{ fontFamily: '"Geist Mono", "Geist Mono Fallback", monospace' }}>
            zemidev01
          </div>
          <div className="loading-bar">
            <div className="loading-bar-fill"></div>
          </div>
          <style jsx>{`
            .loading-bar {
              width: 200px;
              height: 4px;
              background: #ffffff1a;
              border-radius: 4px;
              overflow: hidden;
            }
            .loading-bar-fill {
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, #525252, transparent);
              animation: loading 2s infinite;
            }
            @keyframes loading {
              0% { transform: translate(-100%); }
              100% { transform: translate(100%); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-300 relative overflow-hidden" style={{ fontFamily: '"Geist Mono", "Geist Mono Fallback", monospace' }}>
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />
      
      <div className={`relative min-h-screen flex items-center justify-center p-4 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-4xl bg-zinc-900/90 rounded-lg shadow-2xl border border-neutral-700 backdrop-blur-sm">
          {/* Window Header */}
          <div className="flex items-center px-4 py-2 bg-black/50 rounded-t-lg border-b border-neutral-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
            </div>
            <div className="flex-1 text-center text-sm tracking-wider" style={{ fontFamily: '"Geist Mono", "Geist Mono Fallback", monospace' }}>
              {currentTime}
            </div>
            <Terminal className="w-5 h-5 animate-glow" />
          </div>

          {/* Terminal Content */}
          <div className="p-6 space-y-6">
            {/* Terminal Prompt */}
            <div className="flex flex-wrap items-center gap-1 text-xl md:text-2xl font-bold">
              <span className="text-neutral-300">root@zemidev01</span>
              <span className="text-neutral-500">:~$</span>
              <span className="animate-cursor">█</span>
            </div>

            {/* System Logs */}
            <div className="space-y-1 terminal-container">
              <div className="terminal-line">
                <span className="text-neutral-500">[system]</span>
                <span className="terminal-text"> Initializing zemidev01 terminal website...</span>
              </div>
              <div className="terminal-line">
                <span className="text-neutral-500">[status]</span>
                <span className="terminal-text"> Launch countdown: <span className="animate-pulse">???</span></span>
              </div>
              <div className="terminal-line">
                <span className="text-neutral-500">[info]</span>
                <span className="terminal-text"> Preparing secure environment...</span>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-4 mt-8 text-sm">
              <div className="feature-card group">
                <Shield className="w-5 h-5 mb-2 text-white group-hover:animate-bounce" />
                <h3 className="font mb-1 text-white">Security First</h3>
                <p className="text-neutral-400">Advanced encryption & firewall protection</p>
              </div>

              <div className="feature-card group">
                <Cloud className="w-5 h-5 mb-2 text-white group-hover:animate-bounce" />
                <h3 className="font mb-2 text-white">99.9% Uptime</h3>
                <p className="text-neutral-400">Enterprise-grade infrastructure</p>
              </div>

              <div className="feature-card group">
                <Cpu className="w-5 h-5 mb-2 text-white group-hover:animate-bounce" />
                <h3 className="font mb-2 text-white">24/7 Support</h3>
                <p className="text-neutral-400">Expert assistance always available</p>
              </div>

              <div className="feature-card group">
                <Gamepad2 className="w-5 h-5 mb-2 text-white group-hover:animate-bounce" />
                <h3 className="font mb-2 text-white">Game Servers</h3>
                <p className="text-neutral-400">Optimized for low latency gaming</p>
              </div>
            </div>

            {/* Status Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Status: Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span>Security Level: Maximum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Network: Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .feature-card {
          border-radius: 0.25rem;
          border-width: 1px;
          border-style: solid;
          border-color: rgb(38, 38, 38);
          background-color: rgba(0, 0, 0, 0.5);
          padding: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .feature-card:hover {
          border-color: rgb(82, 82, 82);
          background-color: rgba(0, 0, 0, 0.7);
        }
        .terminal-container {
          max-width: 100%;
          overflow-x: hidden;
        }
        .terminal-line {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.5rem;
          align-items: flex-start;
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        .terminal-line:nth-child(1) { animation-delay: 0s; }
        .terminal-line:nth-child(2) { animation-delay: 0.5s; }
        .terminal-line:nth-child(3) { animation-delay: 1s; }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .terminal-text {
          overflow: hidden;
          white-space: pre-wrap;
          word-break: break-word;
        }
        @keyframes cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-cursor {
          animation: cursor 1s infinite;
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3)); }
          50% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6)); }
        }
        .animate-glow {
          animation: glow 2s infinite;
        }
      `}</style>
    </div>
  );
}
