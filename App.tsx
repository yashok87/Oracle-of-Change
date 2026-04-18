import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Dices, 
  Terminal, 
  Cpu, 
  ShieldAlert, 
  Activity, 
  Settings2, 
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  LayoutGrid,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { LogicState, LogicResult, LogicMode } from './types';
import { processLogic } from './services/logicService';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MODE_ICONS: Record<LogicMode, React.ReactNode> = {
  COMPARISON: <Settings2 className="w-4 h-4" />,
  RECOMMENDATION: <Zap className="w-4 h-4" />,
  DECISION: <ShieldAlert className="w-4 h-4" />,
  KNOWLEDGE: <Terminal className="w-4 h-4" />,
};

const MODE_COLORS: Record<LogicMode, string> = {
  COMPARISON: 'text-blue-400',
  RECOMMENDATION: 'text-amber-400',
  DECISION: 'text-red-400',
  KNOWLEDGE: 'text-emerald-400',
};

export function App() {
  const [state, setState] = useState<LogicState>({
    status: 'IDLE',
    input: '',
    result: null,
    chaosLevel: 25,
    autoCalibration: true,
  });
  const [showChaosToggle, setShowChaosToggle] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!state.input.trim() || state.status === 'PROCESSING') return;

    setState((prev: LogicState) => ({ ...prev, status: 'PROCESSING' }));

    // Auto calibration logic
    let currentChaos = state.chaosLevel;
    if (state.autoCalibration) {
        currentChaos = Math.floor(Math.random() * 100);
    }

    try {
      const result = await processLogic(state.input, currentChaos);
      setState((prev: LogicState) => ({ ...prev, status: 'RESULT', result }));
      setShowChaosToggle(false);
    } catch (err: any) {
      setState((prev: LogicState) => ({ ...prev, status: 'ERROR', error: err.message }));
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.status, state.result]);

  return (
    <div className="min-h-screen grid-bg selection:bg-white/20 selection:text-white flex flex-col font-mono relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent shadow-glow" />
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/10 p-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tighter uppercase mr-2">Logic Router <span className="text-[10px] opacity-40 font-normal ml-1">v2.5.0</span></h1>
            <div className="flex gap-2">
              <span className="text-[9px] text-emerald-500 flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM_STABLE
              </span>
              <span className="text-[9px] text-white/30 truncate max-w-[150px]">
                ENV: PROD_SANDBOX
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="w-px h-8 bg-white/10" />
          <Settings2 className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-32 px-4 max-w-4xl mx-auto w-full flex flex-col gap-6" ref={scrollRef}>
        
        {/* Input Block */}
        <section className="bg-white/[0.02] border border-white/5 p-6 rounded-lg backdrop-blur-sm relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-10 group-focus-within:opacity-30 transition-opacity">
              <Terminal className="w-12 h-12" />
           </div>
           
           <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                   <Activity className="w-3 h-3" />
                   Awaiting_Grammar_Input
                </label>
                {state.input.length > 0 && (
                  <button 
                    type="button"
                    onClick={() => setState((prev: LogicState) => ({ ...prev, input: '', status: 'IDLE', result: null }))}
                    className="text-[9px] text-red-500/50 hover:text-red-500 uppercase font-black"
                  >
                    [clear_input]
                  </button>
                )}
              </div>
              
              <textarea
                value={state.input}
                onChange={(e) => setState((prev: LogicState) => ({ ...prev, input: e.target.value }))}
                placeholder="Enter query (e.g., 'Tea or coffee?', 'Movie for tonight', 'Should I act?')..."
                className="w-full bg-transparent border-none outline-none resize-none text-xl md:text-2xl font-bold placeholder:text-white/5 min-h-[120px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex gap-4">
                  <div className="text-[9px] p-1 px-2 border border-white/10 rounded uppercase opacity-30 hover:opacity-100 transition-opacity flex items-center gap-1 cursor-help group/tip">
                    <HelpCircle className="w-3 h-3" />
                    Syntax Tips
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-black border border-white/10 p-3 rounded scale-0 group-hover/tip:scale-100 transition-transform origin-bottom-left z-50 pointer-events-none">
                      <p className="text-[10px] text-white/60 leading-relaxed capitalize">
                        • "vs" | "or" → Comparison<br/>
                        • Noun items → Recommendation<br/>
                        • "Should I" → Decision<br/>
                        • "What is" → Knowledge
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={state.status === 'PROCESSING'}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2 rounded font-black text-xs uppercase tracking-widest transition-all active:scale-95",
                    state.status === 'PROCESSING' 
                      ? "bg-white/10 text-white/30 cursor-not-allowed" 
                      : "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  )}
                >
                  {state.status === 'PROCESSING' ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : <ArrowRight className="w-4 h-4" />}
                  Route_Logic
                </button>
              </div>
           </form>
        </section>

        {/* Status Feed */}
        <AnimatePresence>
          {state.status === 'PROCESSING' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 border-l-2 border-white/10 pl-4 py-2"
            >
              <div className="text-[9px] opacity-40 font-black animate-pulse uppercase tracking-[0.2em]">PROCESSING_GATE_SYNTAX...</div>
            </motion.div>
          )}

          {state.status === 'ERROR' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-3"
            >
              <AlertTriangle className="text-red-500 w-5 h-5 flex-shrink-0" />
              <div className="text-xs font-bold text-red-500 uppercase tracking-tighter">{state.error}</div>
            </motion.div>
          )}

          {state.status === 'RESULT' && state.result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6"
            >
              {/* Main Output */}
              <div className="relative group">
                 <div className="relative bg-[#0F0F0F] border border-white/10 p-8 rounded-lg min-h-[200px] flex flex-col gap-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                       <div className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                          <Activity className="w-3 h-3 text-emerald-500" />
                          MANTRA_REVEALED
                       </div>
                       <div className="text-[9px] opacity-30 flex items-center gap-2 uppercase">
                         GATE_ALPHA // {state.result.mode}
                       </div>
                    </div>

                    <div className="text-xl md:text-2xl font-mono text-white tracking-tight leading-relaxed whitespace-pre-wrap">
                       {state.result.output}
                    </div>

                    {state.result.mode === 'RECOMMENDATION' && state.result.metadata?.recommendation?.title && (
                       <div className="pt-6 border-t border-white/5 flex justify-end">
                          <a 
                            href={`https://www.google.com/search?q=${encodeURIComponent(state.result.metadata.recommendation.title + " movie info")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded bg-white/5"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Study_Evidence: {state.result.metadata.recommendation.title}
                          </a>
                       </div>
                    )}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="fixed bottom-0 w-full p-6 bg-gradient-to-t from-[#0D0D0D] to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 pointer-events-auto relative">
           
           <AnimatePresence>
             {showChaosToggle && (
               <motion.div 
                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 5, scale: 0.95 }}
                 className="absolute bottom-full mb-4 w-72 bg-[#1A1A1A] border border-white/10 rounded-lg p-5 shadow-2xl flex flex-col gap-4"
               >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Chaos_Calibration</span>
                    <button onClick={() => setShowChaosToggle(false)}><XCircle className="w-4 h-4 opacity-20 hover:opacity-100" /></button>
                  </div>

                  <div className="space-y-3">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={state.chaosLevel}
                      onChange={(e) => setState(prev => ({ ...prev, chaosLevel: parseInt(e.target.value) }))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-[8px] opacity-30 font-black uppercase">
                       <span>Logic_Gate</span>
                       <span>{state.chaosLevel}%</span>
                       <span>Chaos_Gate</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative w-4 h-4 border border-white/20 rounded-sm flex items-center justify-center group-hover:border-white/40 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={state.autoCalibration}
                          onChange={(e) => setState(prev => ({ ...prev, autoCalibration: e.target.checked }))}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        {state.autoCalibration && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 italic transition-opacity">Auto_Pilot</span>
                    </label>

                    <button 
                      onClick={() => handleSubmit()}
                      className="px-3 py-1.5 bg-white text-black text-[9px] font-black uppercase tracking-tighter rounded hover:bg-white/90 active:scale-95 transition-all"
                    >
                      Enter
                    </button>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>

           <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowChaosToggle(!showChaosToggle)}
                className={cn(
                  "flex items-center gap-2 pr-6 pl-4 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 group border-2",
                  "bg-[#0D0D0D] border-white/10 hover:border-white/30 text-white/80 hover:text-white"
                )}
              >
                <div className="flex items-center gap-2">
                   <Dices className={cn("w-4 h-4 transition-transform duration-700", showChaosToggle ? "rotate-180" : "")} />
                   ROLL_THE_DICE_AGAIN
                   <ChevronDown className={cn("w-3 h-3 opacity-30 transition-transform", showChaosToggle ? "rotate-180" : "")} />
                </div>
              </button>
           </div>
           
           <div className="text-[8px] opacity-20 uppercase tracking-[0.4em] font-black">
              LOGIC-GATE PROCESSOR // MANTRA_STABLE
           </div>
        </div>
      </footer>
    </div>
  );
}
