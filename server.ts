import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Gemini if key exists
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// REST Endpoints
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array in request body." });
    }

    if (!ai) {
      // Graceful fallback if API key is not yet set up
      return res.json({
        text: "Benvenuto! I am Dr. Surina's Virtual Medical Assistant. Although Gemini is currently waiting for your clinic's API key in Settings, I can tell you that we have over 35 years of gold-standard dental experience. We specialize in immediate-loading All-on-4 implants using Swiss-designed Straumann implants and completely painless Conscious Sedation here in Slovenia (close to Trieste). How may I help you configure your free virtual diagnosis today?"
      });
    }

    const systemInstruction = `
You are the elite, warm, compassionate, and highly professional Virtual Assistant for "Zobozdravstvo Surina" (Dental Clinic Dr. Surina), located in Slovenia near the Italian border (Trieste). 
Your objective is to provide high-ticket dental marketing assistance to international patients inquiring about dental implants, particularly our All-on-4/6 immediate-loading procedures.

Here is key authentic information you MUST use to answer patient inquiries:
- Name: Zobozdravstvo Surina (Dental Clinic Dr. Surina)
- Location: Slovenia, very close to Trieste (Italy, 40 min travel) and Rijeka (Croatia). Easily accessible. We offer private chauffeured transport and assist with complimentary luxury hotel reservations!
- Our Specialists:
  1. Dr. Lučiano Surina: Founder & Head of Implantoprotetika (Implant Prosthodontics). Decades of clinical experience restoring complete arches and crafting lifelike aesthetic dental crowns.
  2. M.sc. Dr. Uroš Surina: Lead Implantology Specialist. Graduated with honors, holds a prestigious Master of Science (M.sc.) in Implantology from IMC Muenster in Germany (class of 2016). He has personally placed over 10,000 implants.
- Core Technologies:
  * 3D CBCT Digital Tomography: 10 times less radiation than standard dental clinics, yielding micron-level precision bone scanning.
  * Intraoral 3D Laser Scanner (Trios): Completely replaces standard gag-inducing dental compound molds with precise 3D camera sweeps.
  * Conscious Sedation: Safe intravenous twilight states managed by certified anesthesiologists. Patients stay relaxed, in an anxiety-free state of twilight dreaming. This makes implants 100% painless (Brezbolečinsko / indolore) and incredibly easy, especially for patients with severe dental fear.
  * Computer-Guided Implantology: High-tech placement guides designed on CAD/CAM. Implants are slotted surgically with micron-level precision and minimal healing delays.
- Premium Quality Materials: We work exclusively with Straumann® Premium Swiss Implants (the undisputed global leader), providing an official lifetime warranty and a verified Implant Passport.
- Highly Affordable Pricing: Patients get Austrian/German premium level implantology and world-class Swiss materials at Slovenia's highly optimized, non-inflated prices. This allows patients to save 50-60% compared to average dental quotes in northern Italy or Graz.
- Next Step Recommendation: Encourage patients to submit their panoramic dental X-rays for a 100% Free Virtual Consult, complete diagnostics, or to leave their phone number so Dr. Surina's medical team can contact them directly.

Conversion/Marketing Guidelines:
- Treat the user's dental panic and financial concerns with great care, deep empathy, and reassurance. Focus on painless dentistry.
- Keep answers beautifully structured, warm, objective, professional, and relatively short. Use small bullet points.
- You speak fluent English, Italian (highly relevant for Trieste/Veneto region customers), Slovenian, and German (highly relevant given Dr. Uroš's master's credentials from Germany). Always respond in the language used by the patient. Keep replies realistic and clinical.
`;

    const chatHistory = messages.slice(0, -1).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const latestMessage = messages[messages.length - 1]?.text || "";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: latestMessage }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again.", details: error.message });
  }
});

// Capture premium dental leads
const LEADS_FILE = path.join(__dirname, 'leads.json');
app.post('/api/lead', (req, res) => {
  try {
    const lead = {
      ...req.body,
      id: `lead_${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    let currentLeads = [];
    if (fs.existsSync(LEADS_FILE)) {
      try {
        currentLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
      } catch (err) {
        currentLeads = [];
      }
    }
    
    currentLeads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads, null, 2), 'utf8');
    
    res.json({ success: true, message: "Thank you! Your inquiries and details have been transmitted. Dr. Uroš Surina's medical consultation team will review your case and contact you in the next 12 hours." });
  } catch (error) {
    res.status(500).json({ error: "Could not save lead data." });
  }
});

// Serve frontend SPA
const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  // Production files are served from /dist
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // In development, handle Vite middleware
  const { createServer } = await import('vite');
  const viteServer = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  
  app.use(viteServer.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
