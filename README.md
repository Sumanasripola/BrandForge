# 🎯 BrandForge  
### Generative AI-Powered Branding Automation System

BrandForge is a full-stack AI-powered branding engine that helps startups and small businesses generate complete professional brand identities within seconds.

It eliminates the need for expensive branding agencies by combining:

- 🧠 Strategic brand reasoning (Gemini AI)
- 🎨 AI logo generation (Stable Diffusion via HuggingFace)
- 🚀 Automated marketing kit creation
- 🏛 Brand archetype & persona modeling

---

## 🚀 Features

### 💎 Identity Core
- Brand positioning statement  
- Brand interpretation & justification  
- Mission & Vision  
- 5 AI-generated brand names with logic  
- 5 strategic taglines  

### 🧠 Strategy & Persona
- Ideal customer persona  
- Core goals & pain points  
- Discovery channels  
- Brand archetype  
- Voice & tone guide  
- Writing rules + power words  

### 🎨 Visual Studio
- AI-generated logos (Stable Diffusion XL)
- Color palette with hex codes
- Emotional reasoning for each color
- Visual moodboard direction

### 🚀 Marketing Kit
- Instagram bio
- Twitter bio
- LinkedIn bio
- Launch post (carousel structured)
- Engagement post (poll format)
- 10 SEO hashtags

---

# 🛠 Tech Stack

## Frontend
- React 19
- TypeScript
- Vite

## Backend
- Node.js
- Express
- CORS
- dotenv

## AI Integration
- Google Gemini (`@google/genai`)
- HuggingFace Stable Diffusion XL
- Structured JSON schema enforcement

---

# 🧠 System Architecture

```
User Input (Industry, Tone, Audience, Vision)
            ↓
React Frontend
            ↓
Gemini Service (Structured JSON Output)
            ↓
Brand Identity Generated
            ↓
Express Logo API
            ↓
Stable Diffusion via HuggingFace
            ↓
Base64 Image Returned to UI
```

---

# 📦 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Sumanasripola/BrandForge
cd BrandForge
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Create Environment File

Create a file:

```
.env.local
```

Add your API keys:

```
GEMINI_API_KEY=your_gemini_api_key
HF_API_KEY=your_huggingface_api_key
```

⚠️ Do NOT commit this file.

---

## 4️⃣ Run Backend Server

```bash
node server/server.js
```

Backend runs on:

```
http://localhost:3001
```

---

## 5️⃣ Run Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

# 📁 Project Structure

```
BrandForge/
│
├── components/        # UI Components
├── services/          # Gemini AI integration
├── server/            # Express backend for logo generation
├── App.tsx            # Main UI logic
├── types.ts           # TypeScript interfaces
├── vite.config.ts     # Vite configuration
└── package.json
```

---

# 🧠 AI Engineering Highlights

## Structured JSON Output Enforcement

Gemini is configured with:

```ts
responseMimeType: "application/json"
responseSchema: { ... }
```

This guarantees:
- Predictable AI outputs
- Strong typing
- Safe frontend rendering
- No hallucinated structure

---

## Prompt Engineering Strategy

BrandCraft uses role-based prompting:

> "You are an expert brand strategist, marketing consultant, and creative director..."

This ensures:
- Strategic reasoning
- Emotional positioning
- Market alignment
- Brand differentiation logic

---

## AI Logo Generation

- Stable Diffusion XL model
- Minimalist vector-style prompts
- Dynamic brand-based prompt generation
- Base64 image handling

---

# 🔐 Security Notes

- API keys stored in `.env.local`
- HuggingFace call handled server-side
- No secret exposure to frontend

---

# 🚀 Future Improvements

- Export branding kit as PDF
- Save & compare brand versions
- Domain availability checker
- Deployment (Vercel + Render)
- Rate limit handling & retry strategy

---

# 📈 Business Impact

BrandCraft reduces:
- Branding agency costs
- Time-to-market
- Strategy planning overhead

It empowers:
- Solo founders
- Startups
- Small businesses
- Indie makers

---

# 👩‍💻 Author

Built as a Generative AI branding automation platform  
Designed for modern founders and next-generation startups.

