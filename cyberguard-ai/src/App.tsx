import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import LandingPage from './components/LandingPage.js';
import DashboardStats from './components/DashboardStats.js';
import PhishingDetect from './components/PhishingDetect.js';
import IPReputation from './components/IPReputation.js';
import NetworkAnalyzer from './components/NetworkAnalyzer.js';
import ThreatIntelligence from './components/ThreatIntelligence.js';
import ReportGenerator from './components/ReportGenerator.js';
import SecurityCopilot from './components/SecurityCopilot.js';
import { URLScanResult, IPScanResult, NetworkAnalyzeResult, SystemStats } from './types.js';
import { Shield, Sparkles, Activity, Download, ListCollapse, Command } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [role, setRole] = useState<'Admin' | 'Analyst' | 'Viewer'>('Analyst');
  const [currentUser, setCurrentUser] = useState<string | null>('siddharthagoutham17@gmail.com');

  // Loading indicator states
  const [phishingLoading, setPhishingLoading] = useState(false);
  const [ipLoading, setIpLoading] = useState(false);
  const [networkLoading, setNetworkLoading] = useState(false);

  // Scan History Lists (Pre-populate with realistic starting data)
  const [phishingScans, setPhishingScans] = useState<URLScanResult[]>([
    {
      url: 'https://paypal.com',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      riskScore: 2,
      status: 'safe',
      length: 18,
      specialChars: 0,
      subdomainCount: 0,
      httpsUsage: true,
      ageMonths: 140,
      detectedKeywords: [],
      confidenceScore: 98,
      aiExplanation: "Official, highly registered financial gateway. Cryptographic certificates are validated and clean recursive baselines are logged.",
      mitigationSteps: ["No tactical action requested."]
    }
  ]);

  const [ipScans, setIpScans] = useState<IPScanResult[]>([
    {
      ip: '8.8.8.8',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      riskScore: 0,
      status: 'safe',
      country: 'United States',
      countryCode: 'US',
      isp: 'Google LLC',
      openPorts: [53],
      threatHistory: ['Benign recursive DNS infrastructure.'],
      recommendedActions: ['No actions necessary.'],
      aiExplanation: "Host parameters confirm safe usage. Clean recursive behavior logged on port 53 public interface."
    }
  ]);

  const [networkScans, setNetworkScans] = useState<NetworkAnalyzeResult[]>([]);

  // Globally calculated stats
  const [stats, setStats] = useState<SystemStats>({
    threatsDetectedToday: 4,
    highRiskAlerts: 1,
    safeTrafficPercent: 99.4,
    blockedAttacks: 142,
    systemRiskScore: 12,
  });

  // Dynamically compute global stats whenever scan history updates
  useEffect(() => {
    // Collect all malicious and suspicious findings
    const dangerousUrlCount = phishingScans.filter(s => s.status !== 'safe').length;
    const dangerousIpCount = ipScans.filter(s => s.status !== 'safe').length;
    const dangerousNetCount = networkScans.filter(s => s.status !== 'safe').length;

    const criticalUrlCount = phishingScans.filter(s => s.riskScore >= 75).length;
    const criticalIpCount = ipScans.filter(s => s.riskScore >= 75).length;
    const criticalNetCount = networkScans.filter(s => s.riskScore >= 75).length;

    const threatsToday = 4 + dangerousUrlCount + dangerousIpCount + dangerousNetCount;
    const highAlerts = 1 + criticalUrlCount + criticalIpCount + criticalNetCount;
    
    // Weighted risk score calculation
    let totalRiskCount = 12;
    let itemsCount = 1;

    phishingScans.forEach(s => {
      totalRiskCount += s.riskScore;
      itemsCount++;
    });
    ipScans.forEach(s => {
      totalRiskCount += s.riskScore;
      itemsCount++;
    });
    networkScans.forEach(s => {
      totalRiskCount += s.riskScore;
      itemsCount++;
    });

    const averageRisk = Math.round(totalRiskCount / itemsCount);

    setStats(prev => ({
      ...prev,
      threatsDetectedToday: threatsToday,
      highRiskAlerts: highAlerts,
      systemRiskScore: Math.min(100, Math.max(2, averageRisk)),
      blockedAttacks: 142 + (dangerousUrlCount * 4) + (dangerousIpCount * 12) + (dangerousNetCount * 18),
      safeTrafficPercent: Math.max(82.4, parseFloat((99.4 - (averageRisk * 0.15)).toFixed(1)))
    }));
  }, [phishingScans, ipScans, networkScans]);

  // Handle Scan Completes
  const handlePhishingComplete = (res: URLScanResult) => {
    setPhishingScans(prev => [res, ...prev]);
  };

  const handleIPComplete = (res: IPScanResult) => {
    setIpScans(prev => [res, ...prev]);
  };

  const handleNetworkComplete = (res: NetworkAnalyzeResult) => {
    setNetworkScans(prev => [res, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]">
      
      {/* Navigation and Simulated Auth Status bar */}
      <Header
        onNavigate={setActiveTab}
        activeTab={activeTab}
        role={role}
        setRole={setRole}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <main className="flex-1 w-full flex flex-col">
        {activeTab === 'landing' ? (
          /* High-fidelity Landing Page representation */
          <LandingPage
            onStartAnalysis={() => {
              if (currentUser) setActiveTab('dashboard');
              else {
                // If not signed in, pop modal or sign in automatically to help user experience
                setCurrentUser('siddharthagoutham17@gmail.com');
                setActiveTab('dashboard');
              }
            }}
            onStartDemo={() => {
              setCurrentUser('siddharthagoutham17@gmail.com');
              setActiveTab('dashboard');
            }}
          />
        ) : !currentUser ? (
          /* Sign-in Wall */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-6 shadow-xl shadow-blue-500/5">
              <Shield className="h-7 w-7" />
              <div className="absolute inset-0 rounded-2xl border border-blue-500/20 animate-ping opacity-44" />
            </div>
            <h2 className="font-heading text-xl font-bold">CyberGuard Core Gateway Wall</h2>
            <p className="mt-2 text-xs text-slate-400 leading-normal">
              An active session credentials clear is required to download or run live threat heuristic sweeps. Click "Start Sandbox Session" to sign in.
            </p>
            <button
              onClick={() => {
                setCurrentUser('siddharthagoutham17@gmail.com');
                setActiveTab('dashboard');
              }}
              className="mt-6 w-full rounded-xl bg-blue-600 hover:bg-blue-500 p-3.5 text-xs font-bold text-white transition-all shadow-lg shadow-blue-500/15"
            >
              Start Sandbox Session
            </button>
          </div>
        ) : (
          /* Main Dashboard Console layout template */
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
            
            {/* Context Breadcrumbs Panel */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-5 gap-4">
              <div>
                <span className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 inline-block animate-pulse shrink-0" />
                  <span>SOC OPERATING SPACE</span>
                </span>
                <h1 className="mt-1 font-heading text-2xl font-bold text-white">
                  {activeTab === 'dashboard' && "Active Threats Overview"}
                  {activeTab === 'phishing' && "Heuristics URL Scanner"}
                  {activeTab === 'ip' && "Carrier IP Assessment"}
                  {activeTab === 'network' && "PCAP Packet Logs Analysis"}
                  {activeTab === 'intel' && "Global Threat Indicators"}
                  {activeTab === 'copilot' && "Operations Advisory agent"}
                  {activeTab === 'reports' && "Security Compliance Reports"}
                </h1>
              </div>

              {/* Console Quick Tab select */}
              <div className="flex items-center space-x-2">
                <span className="hidden md:inline-block font-mono text-[10px] text-slate-500 font-semibold uppercase">Tab Console:</span>
                <div className="flex border border-slate-800 bg-slate-900 rounded-xl p-1 font-mono text-[11px] font-semibold text-slate-400 overflow-x-auto max-w-[340px] sm:max-w-none">
                  {[
                    { id: 'dashboard', label: 'METRICS' },
                    { id: 'phishing', label: 'PHISHURL' },
                    { id: 'ip', label: 'IPREP' },
                    { id: 'network', label: 'NETLOG' },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveTab(sub.id)}
                      className={`px-3 py-1.5 rounded-lg transition ${
                        activeTab === sub.id
                          ? 'bg-blue-600 text-white font-bold'
                          : 'hover:text-white'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Render Tab Screens */}
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {activeTab === 'dashboard' && (
                <>
                  <DashboardStats stats={stats} totalScansCount={phishingScans.length + ipScans.length + networkScans.length - 2} />
                  
                  {/* Dashboard lower quick review grid */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    
                    {/* Recent sweeps table */}
                    <div className="bento-card bg-slate-900/40 space-y-4">
                      <div>
                        <span className="font-mono text-[10px] text-blue-400 font-bold uppercase block tracking-wider">CHRONOLOGICAL LOGGED INDICATORS</span>
                        <h3 className="font-heading text-base font-bold text-white mt-1">Live Audit Swarm</h3>
                      </div>
                      
                      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                        {phishingScans.map((scUrl, idx) => (
                          <div key={`ds-phish-${idx}`} className="rounded-xl bg-slate-950/70 border border-slate-800/80 p-3 flex items-center justify-between text-xs hover:border-blue-500/20 transition-all">
                            <span className="truncate pr-4 max-w-[240px] font-mono text-slate-300" title={scUrl.url}>{scUrl.url}</span>
                            <span className={`font-mono font-bold uppercase text-[10px] ${scUrl.status === 'safe' ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {scUrl.status} ({scUrl.riskScore}/100)
                            </span>
                          </div>
                        ))}
                        {ipScans.map((scIp, idx) => (
                          <div key={`ds-ip-${idx}`} className="rounded-xl bg-slate-950/70 border border-slate-800/80 p-3 flex items-center justify-between text-xs hover:border-blue-500/20 transition-all">
                            <span className="font-mono text-slate-300">Origin IP: {scIp.ip} ({scIp.country})</span>
                            <span className={`font-mono font-bold uppercase text-[10px] ${scIp.status === 'safe' ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {scIp.status} ({scIp.riskScore}/100)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dashboard advice banner */}
                    <div className="bento-card bg-gradient-to-br from-[#0c1122]/90 via-[#0a0e1c]/90 to-[#101b35]/70 flex flex-col justify-between group">
                      <div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <h4 className="mt-4 font-heading text-base font-bold text-white">Remediate with CyberGuard Copilot</h4>
                        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                          Want an advanced strategic analysis of your active threat level? Our Gemini SOC bot matches your scanned assets against MITRE procedures to generate firewall blocking rules.
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab('copilot')}
                        className="mt-6 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white transition-all text-center cursor-pointer shadow-lg shadow-blue-500/10"
                        id="copilot-nav-btn"
                      >
                        Launch Advisory Copilot
                      </button>
                    </div>

                  </div>
                </>
              )}

              {activeTab === 'phishing' && (
                <PhishingDetect
                  onScanComplete={handlePhishingComplete}
                  isLoading={phishingLoading}
                  setIsLoading={setPhishingLoading}
                />
              )}

              {activeTab === 'ip' && (
                <IPReputation
                  onScanComplete={handleIPComplete}
                  isLoading={ipLoading}
                  setIsLoading={setIpLoading}
                />
              )}

              {activeTab === 'network' && (
                <NetworkAnalyzer
                  onScanComplete={handleNetworkComplete}
                  isLoading={networkLoading}
                  setIsLoading={setNetworkLoading}
                />
              )}

              {activeTab === 'intel' && (
                <ThreatIntelligence />
              )}

              {activeTab === 'reports' && (
                <ReportGenerator
                  phishingScans={phishingScans}
                  ipScans={ipScans}
                  networkScans={networkScans}
                />
              )}

              {activeTab === 'copilot' && (
                <SecurityCopilot
                  phishingScans={phishingScans}
                  ipScans={ipScans}
                  networkScans={networkScans}
                />
              )}

            </div>

          </div>
        )}
      </main>

      {/* Humble design credit footers */}
      <footer className="border-t border-slate-800 bg-slate-950 py-5">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between text-[11px] font-mono text-slate-500 sm:px-6 lg:px-8">
          <span>CYBERGUARD AI SECURITY SOLUTIONS</span>
          <span>© 2026 SOC DASHBOARD GATEWAY. SECURED.</span>
        </div>
      </footer>

    </div>
  );
}
