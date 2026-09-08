import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(request: Request) {
  try {
    // 1. Verify Authorization (Cron Secret)
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    if (secret !== process.env.CRON_SECRET && request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Initialize Gemini
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Generate a random seed to guarantee completely unique outputs every single time
    const topics = ["Agriculture", "SpaceTech", "Music", "Mental Health", "Logistics", "Elder Care", "Web3 Gaming", "Synthetic Biology", "Personal Finance", "Remote Work", "Robotics", "Ocean Cleanup", "Cybersecurity", "LegalTech", "Pet Care"];
    const technologies = ["AI", "Blockchain", "AR/VR", "IoT", "Quantum Computing", "No-Code", "Marketplace", "SaaS", "Wearables", "Drones"];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomTech = technologies[Math.floor(Math.random() * technologies.length)];

    // 3. Prompt Gemini to generate a new startup idea
    const prompt = `
      You are an expert startup founder and visionary. Generate a highly creative, novel, and realistic startup idea.
      CRITICAL INSTRUCTION: Your idea MUST be completely unique. To ensure this, base your idea on the intersection of ${randomTopic} and ${randomTech}. Do not use generic ideas.
      
      Provide the output in JSON format with the following keys exactly:
      - "name": A catchy, modern name for the startup.
      - "description": A concise, one-sentence description (max 10 words).
      - "domain": The industry or domain (e.g., "${randomTopic}"). Keep it to one or two words.
      - "color": Choose one of the following exact strings randomly: "bg-bauhaus-red", "bg-bauhaus-blue", "bg-bauhaus-yellow", "bg-bauhaus-black".
      - "url": A mock URL based on the name (e.g., "https://startupname.example").
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.9, // High temperature forces the AI to be highly creative and varied
      }
    });

    const text = response.text || '';
    const ideaData = JSON.parse(text);

    // 4. Insert into Supabase
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('startups')
      .insert([ideaData])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Agent Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
