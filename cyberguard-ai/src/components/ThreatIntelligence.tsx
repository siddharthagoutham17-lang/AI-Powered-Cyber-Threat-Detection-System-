import React from 'react';
import { Globe, Users, TrendingUp, AlertOctagon, Terminal, Flame, Eye } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ThreatIntelligence() {
  
  const mostDangerousIps = [
    { ip: '185.156.177.10', country: 'Russia', code: 'RU', isp: 'M247 Ltd', level: 'CRITICAL', score: 98 },
    { ip: '193.106.33.222', country: 'Netherlands', code: 'NL', isp: 'OVH SAS', level: 'CRITICAL', score: 96 },
    { ip: '45.138.22.4', country: 'China', code: 'CN', isp: 'Alibaba Cloud', level: 'HIGH', score: 88 },
    { ip: '109.231.42.155', country: 'Brazil', code: 'BR', isp: 'Hostinger Ltd', level: 'HIGH', score: 85 },
  ];

  const attackCategories = [
    { name: 'Phishing Redirects', count: 420, percentage: '38%' },
    { name: 'SYN Packet DDoS Floods', count: 320, percentage: '29%' },
    { name: 'SSH/RDP brute force', count: 210, percentage: '19%' },
    { name: 'Malware Exfiltrate Beacons', count: 110, percentage: '10%' },
    { name: 'Port Sweeps Recon', count: 40, percentage: '4%' },
  ];

  const recentSecurityEvents = [
    { id: 'AL-902', time: '17:31:02', type: 'DDoS SYN Flood Strike', target: 'Load Balancer core-02', severity: 'critical', actor: '193.106.33.222' },
    { id: 'AL-901', time: '17:28:44', type: 'Phishing Domain Flagged', target: 'User sitemaps sandbox', severity: 'high', actor: 'secure-paypal-login.xyz' },
    { id: 'AL-900', time: '17:15:19', type: 'Malware Beacon handshakes', target: 'Admin workstation-08', severity: 'critical', actor: '185.156.177.10' },
    { id: 'AL-899', time: '17:09:02', type: 'Credential Brute Force Probe', target: 'PostgreSQL instance-01', severity: 'medium', actor: '45.138.22.4' },
    { id: 'AL-898', time: '16:54:12', type: 'Port Sweep Reconnaissance', target: 'Ingress routing switch', severity: 'low', actor: '109.231.42.155' },
  ];

  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'critical': return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
      case 'high': return 'text-orange-400 border-orange-500/20 bg-orange-500/10';
      case 'medium': return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
      default: return 'text-blue-400 border-blue-500/20 bg-blue-500/10';
    }
  };

  // Convert categories to bar format
  const chartCategories = attackCategories.map(c => ({
    name: c.name.split(' ')[0],
    volume: c.count
  }));

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="font-heading text-lg font-bold text-white sm:text-xl">Threat Intelligence Dashboard</h2>
        <p className="mt-1 text-xs text-slate-400">
          Global threat telemetry aggregator mapping live botnet hubs, active exploits feeds, country markers, and category trend distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left Col: Most Dangerous IPs of origin */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 col-span-1 space-y-4">
          <div>
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">ACTIVE THREAT ACTOR FEED</span>
            <h3 className="font-heading text-[15px] font-bold text-white mt-1">Primary Volatile Host origins</h3>
          </div>

          <div className="space-y-3">
            {mostDangerousIps.map((act, idx) => (
              <div key={idx} className="rounded-xl bg-slate-950 border border-slate-850 p-3.5 flex items-center justify-between">
                <div className="truncate pr-2">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-200 text-xs font-mono">
                    <span className="text-gray-400 text-[10px] border border-slate-800 rounded px-1">{act.code}</span>
                    <span>{act.ip}</span>
                  </div>
                  <div className="flex items-center space-x-2 font-semibold text-[10px] text-slate-500 mt-1">
                    <span>{act.country}</span>
                    <span>•</span>
                    <span className="truncate max-w-[120px]">{act.isp}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-black text-rose-400 text-xs">{act.score} RISK</span>
                  <p className="text-[8px] tracking-wider uppercase text-rose-500 mt-0.5 animate-pulse font-bold">{act.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Col: Attack distribution categories */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 col-span-1 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">ATTACK SPECTRUM INDEX</span>
            <h3 className="font-heading text-[15px] font-bold text-white mt-1">Category Statistics</h3>
          </div>

          <div className="space-y-3 my-5">
            {attackCategories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-slate-350">{cat.name}</span>
                <span className="font-mono font-bold text-slate-300">
                  {cat.count} packets <span className="text-blue-400 ml-1.5">({cat.percentage})</span>
                </span>
              </div>
            ))}
          </div>

          {/* Micro Category Bar Chart */}
          <div className="h-28 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartCategories} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="name" stroke="#475569" fontSize={9} />
                <YAxis stroke="#475569" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0F1720', borderColor: '#1E293B' }} />
                <Bar dataKey="volume" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Recent Live SOC alert streams */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 col-span-1 space-y-4">
          <div>
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">LIVE TELEMETRY LOG FEEDS</span>
            <h3 className="font-heading text-[15px] font-bold text-white mt-1 flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping inline-block shrink-0" />
              <span>Real-time Alerts Feed</span>
            </h3>
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {recentSecurityEvents.map((evt, idx) => (
              <div key={idx} className="rounded-xl bg-slate-950/80 border border-slate-850 p-3 relative group overflow-hidden">
                <div className="absolute top-0 right-0 h-full w-[2px] bg-blue-500 opacity-0 group-hover:opacity-100 transition duration-200" />
                
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500 font-bold">{evt.id} | {evt.time}</span>
                  <span className={`rounded-full px-2 py-0.5 font-bold uppercase text-[9px] border ${getSeverityStyle(evt.severity)}`}>
                    {evt.severity}
                  </span>
                </div>

                <p className="mt-2 text-xs font-bold text-white">{evt.type}</p>
                
                <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-450">
                  <span className="truncate max-w-[130px]" title={evt.target}>To: {evt.target}</span>
                  <span className="text-slate-500">From: {evt.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
