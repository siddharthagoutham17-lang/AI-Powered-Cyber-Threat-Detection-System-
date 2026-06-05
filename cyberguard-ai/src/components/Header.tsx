import React, { useState } from 'react';
import { Shield, User, Terminal, LogIn, LogOut, Key, Layers, Wifi, Power } from 'lucide-react';

interface HeaderProps {
  onNavigate: (tab: string) => void;
  activeTab: string;
  role: 'Admin' | 'Analyst' | 'Viewer';
  setRole: (role: 'Admin' | 'Analyst' | 'Viewer') => void;
  currentUser: string | null;
  setCurrentUser: (user: string | null) => void;
}

export default function Header({
  onNavigate,
  activeTab,
  role,
  setRole,
  currentUser,
  setCurrentUser,
}: HeaderProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Auth Form State
  const [email, setEmail] = useState('siddharthagoutham17@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Analyst' | 'Viewer'>('Analyst');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(email);
    setRole(selectedRole);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowProfileDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <div 
          className="flex cursor-pointer items-center space-x-3" 
          onClick={() => onNavigate('landing')}
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Shield className="h-5.5 w-5.5 text-white" />
            <div className="absolute inset-0 rounded-xl border border-blue-400/20 animate-pulse" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold tracking-tight text-white sm:text-xl">
              CyberGuard <span className="text-blue-500">AI</span>
            </span>
            <div className="flex items-center space-x-1.5 font-mono text-[10px] text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>SOC GATEWAY v2.5</span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation */}
        {currentUser && (
          <nav className="hidden lg:flex space-x-1 font-sans text-sm font-medium">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'phishing', label: 'Phishing URL' },
              { id: 'ip', label: 'IP Analysis' },
              { id: 'network', label: 'Network traffic' },
              { id: 'intel', label: 'Threat Intel' },
              { id: 'copilot', label: 'Security Copilot' },
              { id: 'reports', label: 'Reports' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`px-3.5 py-2 rounded-lg transition-all duration-250 ${
                  activeTab === tab.id
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        )}

        {/* Action Controls & Session */}
        <div className="flex items-center space-x-4">
          
          {/* Node Active State indicator */}
          <div className="hidden sm:flex items-center space-x-2 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 font-mono text-[11px] text-slate-300">
            <Wifi className="h-3 w-3 text-emerald-400" />
            <span>NODE: ONLINE</span>
          </div>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2.5 rounded-xl border border-slate-800 bg-slate-900 bg-opacity-65 p-2 px-3 hover:border-slate-700 transition"
                id="profile-dropdown-btn"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold text-white uppercase tracking-wider">
                  {currentUser.substring(0, 2)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="max-w-[140px] truncate text-xs font-semibold text-white">
                    {currentUser}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-blue-400">
                    {role} Level
                  </p>
                </div>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2.5 w-60 origin-top-right rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-xl ring-1 ring-black/10 focus:outline-none backdrop-blur-md z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Account Role Settings</p>
                    <p className="text-xs font-medium text-white truncate mt-0.5">{currentUser}</p>
                  </div>
                  
                  {/* Role Swapper */}
                  <div className="p-2 space-y-1 bg-slate-950/60 rounded-xl mb-2">
                    <span className="flex items-center space-x-1 font-mono text-[9px] text-slate-500 font-semibold mb-1">
                      <Layers className="h-2.5 w-2.5 text-blue-400" />
                      <span>SIMULATE SECURITY PRIVILEGE</span>
                    </span>
                    {(['Admin', 'Analyst', 'Viewer'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRole(r)}
                        className={`flex w-full items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition ${
                          role === r
                            ? 'bg-blue-600/20 text-blue-400 font-medium'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                        }`}
                      >
                        <span>{r} Privilege</span>
                        {role === r && <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Terminate Session</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center space-x-2 rounded-xl bg-blue-600 hover:bg-blue-500 p-2 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all font-sans"
              id="signin-btn"
            >
              <LogIn className="h-4 w-4" />
              <span>Analyst Sign In</span>
            </button>
          )}

        </div>
      </div>

      {/* Embedded Real Firebase Simulations Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <Shield className="h-4.5 w-4.5 text-white" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">
                  {isSignUp ? "Create SOC Credentials" : "Sign In to SOC Core"}
                </h3>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 font-mono tracking-wider">SECURE IDENTITY EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                  placeholder="analyst@cyberguard.ai"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 font-mono tracking-wider">CREDS ACCESS CODE</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 font-mono tracking-wider">INITIAL SECURITY CLEARANCE</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as any)}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-blue-500 focus:outline-none transition"
                >
                  <option value="Viewer">Viewer Level (View metrics & Scans)</option>
                  <option value="Analyst">Analyst Level (Process remediation actions)</option>
                  <option value="Admin">Admin Level (Full perimeter control overrides)</option>
                </select>
              </div>

              {/* Secure Firebase Email/Google Login Simulation Badge info */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3">
                <div className="flex items-start space-x-2.5 font-mono text-[10px] text-slate-400">
                  <Key className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-300 uppercase">Interactive Gate Service:</span>
                    <p className="mt-0.5">Integrates Firebase authorization protocols. Sign in with any password value to access full-scope scans during demo sessions.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 hover:bg-blue-500 transition-all"
                >
                  {isSignUp ? "Generate Credentials Profile" : "Access Threat Dashboard"}
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-center font-sans text-xs text-blue-400 hover:underline pt-1.5"
                >
                  {isSignUp ? "Already have SOC credentials? Login" : "Or setup a new test credentials profile?"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
