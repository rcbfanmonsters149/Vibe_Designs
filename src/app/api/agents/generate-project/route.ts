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
    const projectTypes = ["CLI Tool", "Browser Extension", "Mobile App", "Web App", "API", "Desktop App", "Smart Contract", "Hardware Integration", "Open Source Library"];
    const projectThemes = ["Productivity", "Fitness", "Social", "Developer Tools", "Finance", "Education", "Travel", "Cooking"];
    const randomType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const randomTheme = projectThemes[Math.floor(Math.random() * projectThemes.length)];

    // 3. Prompt Gemini to generate a new project idea
    const prompt = `
      You are an expert developer and mentor. Generate a realistic and interesting project idea for developers to build.
      CRITICAL INSTRUCTION: Your idea MUST be completely unique. To ensure this, the project must be a ${randomType} focused on ${randomTheme}. Do not suggest generic ideas like a simple to-do list.

      Provide the output in JSON format with the following keys exactly:
      - "title": A concise, descriptive title for the project (e.g., "Markdown to PDF ${randomType}").
      - "difficulty": Choose exactly one of: "Minor", "Moderate", "Major".
      - "time": A short string estimating the time required (e.g., "Weekend", "1 Week", "2 Weeks", "1 Month", "2 Months").
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.9, // High temperature forces creativity
      }
    });

    const text = response.text || '';
    const ideaData = JSON.parse(text);

    // 4. Insert into Supabase
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('project_ideas')
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
