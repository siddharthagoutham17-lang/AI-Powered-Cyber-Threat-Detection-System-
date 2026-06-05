import React from 'react';
import { Activity, ShieldAlert, CheckCircle, Flame, Heart, ArrowUpRight, Clock } from 'lucide-react';
import { SystemStats } from '../types.js';

interface DashboardStatsProps {
  stats: SystemStats;
  totalScansCount: number;
}

export default function DashboardStats({ stats, totalScansCount }: DashboardStatsProps) {
  
  // Calculate health index text and color gradient based on total risk score
  const getRiskDetails = (score: number) => {
    if (score <= 20) return { label: 'Safe', color: 'text-emerald-400', border: 'border-emerald-500/10', bg: 'bg-emerald-500/10', bar: 'bg-emerald-400' };
    if (score <= 40) return { label: 'Low Risk', color: 'text-blue-400', border: 'border-blue-500/10', bg: 'bg-blue-500/10', bar: 'bg-blue-400' };
    if (score <= 60) return { label: 'Medium Risk', color: 'text-amber-400', border: 'border-amber-500/10', bg: 'bg-amber-500/10', bar: 'bg-amber-400' };
    if (score <= 80) return { label: 'High Risk', color: 'text-orange-500', border: 'border-orange-500/10', bg: 'bg-orange-500/10', bar: 'bg-orange-500' };
    return { label: 'CRITICAL', color: 'text-rose-500 animate-pulse', border: 'border-rose-500/20', bg: 'bg-rose-500/15', bar: 'bg-rose-500' };
  };

  const risk = getRiskDetails(stats.systemRiskScore);

  return (
    <div className="space-y-6">
      
      {/* Risk Scoring Heuristics Security Gauge Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Security Health Gauge Card */}
        <div className="bento-card bg-slate-900/40 col-span-1 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-bold">SYSTEM IMMUNITY GAUGE</span>
                <h3 className="mt-1 font-heading text-lg font-bold text-white">Overall Network Threat Level</h3>
              </div>
              <span className={`inline-flex items-center space-x-1.5 rounded-full px-3 py-1 text-xs font-semibold ${risk.bg} ${risk.color}`}>
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span className="uppercase">{risk.label}</span>
              </span>
            </div>

            <p className="mt-2.5 text-xs text-slate-300 leading-relaxed max-w-xl">
              Computed in real-time by the CyberGuard correlation engine. Accounts for active URL scan history, suspicious IP logs, and egress packet payloads.
            </p>
          </div>

          <div className="mt-6">
            <div className="flex items-end justify-between font-mono text-xs">
              <span className="text-slate-400">SAFE (0)</span>
              <div className="text-center">
                <span className="text-3xl font-black text-white">{stats.systemRiskScore}</span>
                <span className="text-slate-400">/100 RISK</span>
              </div>
              <span className="text-rose-500 font-bold">CRITICAL (100)</span>
            </div>
            
            {/* Speedometer Bar Container */}
            <div className="mt-3.5 h-3.5 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-850 p-0.5 flex">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${risk.bar}`}
                style={{ width: `${Math.max(4, stats.systemRiskScore)}%` }}
              />
            </div>

            {/* Threshold Ranges */}
            <div className="mt-2.5 flex justify-between text-[10px] font-mono text-slate-500 px-1">
              <span>0-20 Safe</span>
              <span>21-40 Low</span>
              <span>41-60 Med</span>
              <span>61-80 High</span>
              <span>81-100 Critical</span>
            </div>
          </div>
        </div>

        {/* Real-time Threat Clock Console */}
        <div className="bento-card bg-slate-900/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-bold">MONITOR AGENT</span>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <h4 className="mt-2 font-heading text-base font-bold text-white">Active Scans Summary</h4>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Your security console has executed <span className="font-mono font-bold text-blue-400 text-sm">{totalScansCount}</span> unique threat sweeps during this browser sandbox monitoring epoch.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Audit Engine:</span>
            <span className="text-emerald-400 flex items-center space-x-1 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LOG CORRELATOR ACTIVE</span>
            </span>
          </div>
        </div>

      </div>

      {/* Top Cards Statistics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-5">

        {/* Card 1: Threats detected today */}
        <div className="bento-card bento-card-red bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400">Today's Scraped Threats</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-450 shrink-0">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-white sm:text-3xl font-mono">
              {stats.threatsDetectedToday}
            </span>
            <div className="mt-1 flex items-center space-x-1 text-[10px] text-rose-450">
              <span>+3 unique zero-days</span>
            </div>
          </div>
        </div>

        {/* Card 2: High risk alerts */}
        <div className="bento-card bento-card-amber bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400">Active High Risk Alerts</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 shrink-0">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-white sm:text-3xl font-mono">
              {stats.highRiskAlerts}
            </span>
            <div className="mt-1 flex items-center space-x-1 text-[10px] text-orange-400">
              <span>Action advisory active</span>
            </div>
          </div>
        </div>

        {/* Card 3: Safe traffic % */}
        <div className="bento-card bento-card-emerald bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400">Safe Packet baseline</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-white sm:text-3xl font-mono">
              {stats.safeTrafficPercent}%
            </span>
            <div className="mt-1 flex items-center space-x-1 text-[10px] text-emerald-400">
              <span>Exhibits low packet jitter</span>
            </div>
          </div>
        </div>

        {/* Card 4: Blocked Attacks */}
        <div className="bento-card bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400">Autonomous Blocks</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-white sm:text-3xl font-mono">
              {stats.blockedAttacks}
            </span>
            <div className="mt-1 flex items-center space-x-1 text-[10px] text-blue-400">
              <span>Perimeter block rules</span>
            </div>
          </div>
        </div>

        {/* Card 5: Sandbox Status */}
        <div className="bento-card bg-slate-900/40 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400">SOC Sensor Port</span>
            <span className="text-[10px] font-mono text-slate-500">INGRESS</span>
          </div>
          <div className="mt-4">
            <span className="text-xl font-bold uppercase text-white font-sans flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
              <span>ACTIVE</span>
            </span>
            <div className="mt-2 text-[9px] font-mono text-slate-400 uppercase tracking-tight">
              HOST: 3000 CORE
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
