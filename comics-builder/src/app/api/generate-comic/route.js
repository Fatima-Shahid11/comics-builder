import Groq from "groq-sdk";

// Initialize Groq client - this connects to Llama
const groq = new Groq({
  apiKey: process.env.COMIC_BUILDER_API_KEY  // ← Gets key from .env.local
});

export async function POST(request) {
  try {
    // 1. Get user input from frontend
    const { prompt, pages } = await request.json();
    
    // 2. Validate number of pages
    const numPages = Math.min(Math.max(parseInt(pages) || 3, 1), 5);
    
    // 3. Create instruction for Llama
    const systemPrompt = `You are a creative comic book generator. Create a ${numPages}-page comic story and images.

For each page, provide:
- Page number
- Scene description (what happens on this page)
- 2-4 panels per page with detailed visual descriptions
- Dialogue for characters

Respond ONLY with valid JSON in this exact format:
{
  "title": "Your Comic Title",
  "pages": [
    {
      "page": 1,
      "scene": "Brief description of what happens on this page",
      "panels": [
        {
          "panel": 1,
          "description": "Detailed visual description of what's in this panel",
          "dialogue": "What the character says (or empty string if no dialogue)"
        }
      ],
      "icons": "Comic icons related to the page content from material-icons so I can map them. Give only one icon for each page."
    }
  ]
}`;

    console.log("🚀 Sending request to Groq/Llama...");
    
    // 4. Call Groq API with Llama model
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system",    // Instructions for Llama
          content: systemPrompt 
        },
        { 
          role: "user",      // User's request
          content: `Create a comic about: ${prompt}` 
        }
      ],
      
      // 🦙 THIS IS WHERE WE SPECIFY LLAMA MODEL
      model: "llama-3.3-70b-versatile",  // Llama 3.3 (70 billion parameters)
      
      // Model parameters
      temperature: 0.8,      // Creativity level (0-2, higher = more creative)
      max_tokens: 2048,      // Max response length
      top_p: 1,              // Nucleus sampling
      
      // Force JSON response
      response_format: { type: "json_object" }
    });

    console.log("✅ Received response from Llama");

    // 5. Parse Llama's response
    const content = chatCompletion.choices[0].message.content;
    const comic = JSON.parse(content);

    // 6. Send comic back to frontend
    return Response.json({ 
      success: true, 
      comic: comic,
      model: chatCompletion.model,  // Shows which model was used
      usage: chatCompletion.usage   // Token usage stats
    });

  } catch (error) {
    console.error("❌ Error:", error);
    
    // Handle specific errors
    if (error.message.includes('API key')) {
      return Response.json(
        { success: false, error: "Invalid API key. Check your .env.local file" },
        { status: 401 }
      );
    }
    
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}