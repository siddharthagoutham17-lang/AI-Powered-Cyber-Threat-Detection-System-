import React from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, AlertOctagon, Terminal } from 'lucide-react';
import { URLScanResult, IPScanResult, NetworkAnalyzeResult } from '../types.js';

interface ReportGeneratorProps {
  phishingScans: URLScanResult[];
  ipScans: IPScanResult[];
  networkScans: NetworkAnalyzeResult[];
}

export default function ReportGenerator({ phishingScans, ipScans, networkScans }: ReportGeneratorProps) {

  // Function to compile active telemetry into markdown-formatted TXT report, and download it!
  const downloadTXTReport = () => {
    let reportText = `========================================================================
                      CYBERGUARD AI SECURITY COMPLIANCE REPORT
                      Generated: ${new Date().toUTCString()}
========================================================================

------------------------------------------------------------------------
1. EXECUTIVE SECURITY SUMMARY
------------------------------------------------------------------------
This compliance report compiles telemetry collected by CyberGuard AI.
Active sensors monitored Phishing URLs, IP reputations, and Network logs.

Active Scans Record Counts:
- Phishing URL Sweeps: ${phishingScans.length}
- Malicious IP Sweeps: ${ipScans.length}
- Network packet file scans: ${networkScans.length}

------------------------------------------------------------------------
2. PHISHINGURL DETECTION MATRIX
------------------------------------------------------------------------
${phishingScans.length === 0 ? "No URL scan traces populated." : phishingScans.map((sc, i) => `
[Target #${i+1}] ${sc.url}
- Status: ${sc.status.toUpperCase()} (Risk Rating: ${sc.riskScore}/100)
- Characteristics: Length: ${sc.length}, Age: ${sc.ageMonths} months, Key Markers: ${sc.detectedKeywords.join(', ') || 'None'}
- Explanation: ${sc.aiExplanation}
`).join('\n')}

------------------------------------------------------------------------
3. IP REPUTATION LOG RECORDS
------------------------------------------------------------------------
${ipScans.length === 0 ? "No Host IP traces registered." : ipScans.map((ip, i) => `
[Target #${i+1}] ${ip.ip}
- Location: ${ip.country} (${ip.countryCode}) | ISP: ${ip.isp}
- Status: ${ip.status.toUpperCase()} (Risk Score: ${ip.riskScore}/100)
- Exposed Ports: ${ip.openPorts.join(', ') || 'None'}
- Heuristic Flags: ${ip.threatHistory.join('; ')}
- Remediation Guide: ${ip.recommendedActions.join('; ')}
`).join('\n')}

------------------------------------------------------------------------
4. NETWORK TRAFFIC ANOMALY REPORT
------------------------------------------------------------------------
${networkScans.length === 0 ? "No active network log flows computed." : networkScans.map((net, i) => `
[Log #${i+1}] ${net.fileName}
- Protocols: TCP: ${net.protocolStats.tcp}, UDP: ${net.protocolStats.udp}, ICMP: ${net.protocolStats.icmp}
- Status: ${net.status.toUpperCase()} (Volativity: ${net.riskScore}/100)
- Anomalies Raised: ${net.anomaliesDetected.map(a => `${a.type} (${a.severity})`).join(', ') || 'No alarms'}
- Action recommendations: ${net.recommendations.join('; ')}
`).join('\n')}

========================================================================
                      [END OF THREAT AUDIT REPORT]
========================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CyberGuard_SOC_Advisory_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Compile active scanning details inside a downloadable CSV table!
  const downloadCSVReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Type,Asset,Risk Score,Status,Timestamp,Details\n";

    // Phishing scans rows
    phishingScans.forEach(sc => {
      csvContent += `URL,${sc.url},${sc.riskScore},${sc.status},${sc.timestamp},Age Month: ${sc.ageMonths}; Keywords: ${sc.detectedKeywords.join(' ')}\n`;
    });

    // IP scans rows
    ipScans.forEach(sc => {
      csvContent += `IP,${sc.ip},${sc.riskScore},${sc.status},${sc.timestamp},Carrier: ${sc.isp}; Geo: ${sc.country}\n`;
    });

    // Network log rows
    networkScans.forEach(sc => {
      csvContent += `File,${sc.fileName},${sc.riskScore},${sc.status},${sc.timestamp},Total Packets: ${sc.totalPackets}; Anomalies: ${sc.anomaliesDetected.length}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CyberGuard_Sensor_Telemetry_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="font-heading text-lg font-bold text-white sm:text-xl">Security Report Generator</h2>
        <p className="mt-1 text-xs text-slate-400">
          Consolidate collected endpoint logs, format incident mitigation strategies, and automatically compile downloadable compliance sheets for administrators. No mock values used.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Actions panel */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 col-span-1">
          <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest block">REPORT EXPORTS</span>
          
          <button
            onClick={downloadTXTReport}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 p-3.5 text-xs font-bold text-white transition flex items-center justify-between group cursor-pointer"
          >
            <span className="flex items-center space-x-2">
              <FileText className="h-4.5 w-4.5 text-blue-100" />
              <span>Download SOC Advisory (TXT)</span>
            </span>
            <Download className="h-4 w-4 text-blue-200 group-hover:translate-y-0.5 transition shrink-0" />
          </button>

          <button
            onClick={downloadCSVReport}
            className="w-full rounded-xl border border-slate-700 hover:border-slate-550 bg-slate-800 bg-opacity-30 p-3.5 text-xs font-bold text-slate-200 transition flex items-center justify-between group cursor-pointer"
          >
            <span className="flex items-center space-x-2">
              <Terminal className="h-4.5 w-4.5 text-blue-500" />
              <span>Download Telemetry CSV Table</span>
            </span>
            <Download className="h-4 w-4 text-slate-400 group-hover:translate-y-0.5 transition shrink-0" />
          </button>

          {/* Audit parameters panel */}
          <div className="bg-slate-950 rounded-2xl border border-slate-850 p-4 space-y-3 pt-3.5">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500">AUDITED LOG RECORDS SUMMARY</span>
            <div className="text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>Audited URLs count:</span>
                <span className="font-mono text-white font-bold">{phishingScans.length}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Audited IPs count:</span>
                <span className="font-mono text-white font-bold">{ipScans.length}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Audited Files count:</span>
                <span className="font-mono text-white font-bold">{networkScans.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audit elements list preview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 col-span-2">
          <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-4">INCIDENT ADVISORY LOG MATRIX</span>
          
          {phishingScans.length === 0 && ipScans.length === 0 && networkScans.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs text-center p-4">
              <ShieldCheck className="h-10 w-10 text-emerald-500/50 mb-2" />
              <p>No active anomalies found in workspace sensors history.</p>
              <p className="text-[10px] text-slate-600 mt-1 max-w-xs">Scan any URLs or IPs first so the log correlation module compiles active report lists.</p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
              
              {/* Phishing URLs Rows */}
              {phishingScans.map((sc, i) => (
                <div key={`url-${i}`} className="rounded-xl border border-rose-500/10 bg-rose-500/5 p-3 flex items-center justify-between">
                  <div>
                    <span className="bg-rose-500/20 text-rose-450 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase font-bold">URL SCAN</span>
                    <p className="text-xs font-mono font-bold text-white mt-1.5 truncate max-w-[280px]" title={sc.url}>{sc.url}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-rose-400 font-mono font-bold text-xs">{sc.riskScore}/100 Risk</span>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">{sc.status}</p>
                  </div>
                </div>
              ))}

              {/* IP Rows */}
              {ipScans.map((ip, i) => (
                <div key={`ip-${i}`} className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-3 flex items-center justify-between">
                  <div>
                    <span className="bg-amber-500/20 text-amber-500 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase font-bold">IP REPUTATION</span>
                    <p className="text-xs font-mono font-bold text-white mt-1.5">{ip.ip} - {ip.country}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-450 font-mono font-bold text-xs">{ip.riskScore}/100 Risk</span>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">{ip.status}</p>
                  </div>
                </div>
              ))}

              {/* Network flow file rows */}
              {networkScans.map((net, i) => (
                <div key={`net-${i}`} className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-3 flex items-center justify-between">
                  <div>
                    <span className="bg-blue-500/20 text-blue-400 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase font-bold">NETWORK FLOW</span>
                    <p className="text-xs font-mono font-bold text-white mt-1.5">{net.fileName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-400 font-mono font-bold text-xs">{net.riskScore}/100 Risk</span>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">{net.status}</p>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
