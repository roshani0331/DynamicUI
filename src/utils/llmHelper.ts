// src/utils/llmHelper.ts
export async function getUILayoutFromLLM(inputData: object): Promise<any> {
    const OPENAI_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
  
    if (!OPENAI_API_KEY) throw new Error("Missing OpenAI API Key");
  
    const prompt = `
  You are a frontend architect. Given raw JSON data like user profiles or weather info,
  return a clean and hierarchical UI layout JSON using heading, text, container.
  
  JSON:
  ${JSON.stringify(inputData, null, 2)}
  
  Only output valid JSON schema without explanation.
  `;
  
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: 'system', content: 'You generate layout schemas.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.4,
      }),
    });
  
    const result = await res.json();
    const content = result?.choices?.[0]?.message?.content;
  
    if (!content) throw new Error('No layout returned');
  
    try {
      return JSON.parse(
        content.replace(/^```json/, '').replace(/```$/, '').trim()
      );
    } catch {
      throw new Error('Invalid JSON returned');
    }
  }  
