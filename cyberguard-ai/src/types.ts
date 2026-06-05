/**
 * Types and Interfaces for CyberGuard AI
 */

export interface URLScanResult {
  url: string;
  timestamp: string;
  riskScore: number; // 0-100
  status: 'safe' | 'suspicious' | 'malicious';
  length: number;
  specialChars: number;
  subdomainCount: number;
  httpsUsage: boolean;
  ageMonths: number;
  detectedKeywords: string[];
  confidenceScore: number; // 0-100
  aiExplanation: string;
  mitigationSteps: string[];
}

export interface IPScanResult {
  ip: string;
  timestamp: string;
  riskScore: number; // 0-100
  status: 'safe' | 'suspicious' | 'malicious';
  country: string;
  countryCode: string;
  isp: string;
  openPorts: number[];
  threatHistory: string[];
  recommendedActions: string[];
  aiExplanation: string;
}

export interface AnomalyItem {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface NetworkTimelinePoint {
  time: string;
  packets: number;
  anomalies: number;
}

export interface NetworkAnalyzeResult {
  fileName: string;
  timestamp: string;
  totalPackets: number;
  protocolStats: {
    tcp: number;
    udp: number;
    icmp: number;
    other: number;
  };
  riskScore: number;
  status: 'safe' | 'suspicious' | 'malicious';
  anomaliesDetected: AnomalyItem[];
  timelineData: NetworkTimelinePoint[];
  aiSummary: string;
  recommendations: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface AlertLogItem {
  id: string;
  timestamp: string;
  type: 'PHISHING' | 'MALICIOUS_IP' | 'NETWORK_ANOMALY';
  target: string;
  riskScore: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'resolved';
  description: string;
}

export interface SystemStats {
  threatsDetectedToday: number;
  highRiskAlerts: number;
  safeTrafficPercent: number;
  blockedAttacks: number;
  systemRiskScore: number;
}
