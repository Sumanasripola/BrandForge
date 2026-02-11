import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-logo", async (req, res) => {
  try {
    const { name, industry, tone } = req.body;

    const prompt = `
Minimal flat vector icon logo.
No text.
No letters.
No words.

Centered geometric symbol.
White background.
Solid colors only.
Modern SaaS startup style.
Dribbble style icon.
Clean negative space.
Simple shape.
High contrast.
Brand concept inspired by:
${industry} industry,
tone: ${tone}.
`;


    const negativePrompt = `
text, letters, words, watermark, blurry,
3d render, shadow, gradient background,
photorealistic, complex illustration,
low quality, distorted
`;


    const hfResponse = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: negativePrompt,
            guidance_scale: 8.5,
            num_inference_steps: 40,
            width: 768,
            height: 768,
          },
          options: { wait_for_model: true }
        }),
      }
    );

    if (!hfResponse.ok) {
      const errText = await hfResponse.text();
      console.error("HF ERROR:", errText);
      return res.status(500).json({ error: "Logo generation failed" });
    }

    const arrayBuffer = await hfResponse.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    res.json({ image: `data:image/png;base64,${base64}` });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server crashed" });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Logo server running on http://localhost:${PORT}`);
});
