import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { analyzeURL, analyzeIP, analyzeNetwork, generateCopilotResponse } from "./server/analyzer.js";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON payload parsers with generous limits for log files uploads
  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ limit: "20mb", extended: true }));

  // API Endpoints
  
  // 1. Phishing URL Detection Route
  app.post("/api/phishing", async (req, res) => {
    try {
      const { url, bulkUrls } = req.body;
      
      if (bulkUrls && Array.isArray(bulkUrls)) {
        // Bulk scan URLs
        const results = await Promise.all(
          bulkUrls.map(async (u: string) => {
            try {
              return await analyzeURL(u);
            } catch (err) {
              return {
                url: u,
                timestamp: new Date().toISOString(),
                riskScore: 50,
                status: 'suspicious' as const,
                length: u.length,
                specialChars: 0,
                subdomainCount: 0,
                httpsUsage: false,
                ageMonths: 1,
                detectedKeywords: [],
                confidenceScore: 50,
                aiExplanation: 'Scan processing error encountered.',
                mitigationSteps: ['Avoid this URL. Unable to fully verify security parameters.']
              };
            }
          })
        );
        res.json({ results });
      } else {
        // Single URL Scan
        if (!url || typeof url !== 'string') {
          res.status(400).json({ error: "Missing 'url' field in request body." });
          return;
        }
        const result = await analyzeURL(url);
        res.json(result);
      }
    } catch (error) {
      console.error("Phishing API Error:", error);
      res.status(500).json({ error: "Failed to process URL scan metrics." });
    }
  });

  // 2. Malicious IP Detection Route
  app.post("/api/ip-scan", async (req, res) => {
    try {
      const { ip, bulkIps } = req.body;

      if (bulkIps && Array.isArray(bulkIps)) {
        const results = await Promise.all(
          bulkIps.map(async (ipAddr: string) => {
            try {
              return await analyzeIP(ipAddr);
            } catch (err) {
              return {
                ip: ipAddr,
                timestamp: new Date().toISOString(),
                riskScore: 50,
                status: 'suspicious' as const,
                country: 'Unknown',
                countryCode: 'UN',
                isp: 'Unknown Provider',
                openPorts: [],
                threatHistory: [],
                recommendedActions: [],
                aiExplanation: 'An error occurred during bulk checking.'
              };
            }
          })
        );
        res.json({ results });
      } else {
        if (!ip || typeof ip !== 'string') {
          res.status(400).json({ error: "Missing 'ip' field in request body." });
          return;
        }
        const result = await analyzeIP(ip);
        res.json(result);
      }
    } catch (error) {
      console.error("IP scan API Error:", error);
      res.status(500).json({ error: "Failed to check IP address." });
    }
  });

  // 3. Network Traffic Analysis Route
  app.post("/api/network-analyze", async (req, res) => {
    try {
      const { fileName, fileContent } = req.body;
      if (!fileName || typeof fileName !== 'string' || !fileContent) {
        res.status(400).json({ error: "Missing 'fileName' or 'fileContent' field." });
        return;
      }
      const result = await analyzeNetwork(fileName, fileContent);
      res.json(result);
    } catch (error) {
      console.error("Network analyser API Error:", error);
      res.status(500).json({ error: "Failed to compile network traffic analysis." });
    }
  });

  // 4. Copilot AI Chatbot Chat Endpoint
  app.post("/api/copilot", async (req, res) => {
    try {
      const { messages, contextInfo } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Missing 'messages' or incorrect format." });
        return;
      }
      const aiReply = await generateCopilotResponse(messages, contextInfo);
      res.json({ reply: aiReply });
    } catch (error) {
      console.error("Copilot API Error:", error);
      res.status(500).json({ error: "Cyber security advisor suffered a connection setback." });
    }
  });

  // Vite middleware integration for Dev, Static serving for Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite development middleware.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`===============================================`);
    console.log(` CyberGuard AI full-stack backend running`);
    console.log(` Port: ${PORT} | Host: 0.0.0.0`);
    console.log(`===============================================`);
  });
}

startServer();
