// File: src/services/geminiService.ts
export const askGemini = async (question: string): Promise<string> => {
    // Use NEXT_PUBLIC_GEMINI_API_KEY for client-side usage
    const GEMINI_API_KEY = "AIzaSyCwFMfkExoYKOnY0B0oapvfPXtnb9a-rTY";
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not defined in environment variables.");
    }
  
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
    // Build the payload exactly as in your curl command
    const payload = {
      contents: [
        { parts: [{ text: question }] }
      ]
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      // Read the raw response text for debugging purposes
      const rawText = await response.text();
      console.log("Raw Gemini API response:", rawText);
  
      // Parse the response as JSON
      const data = JSON.parse(rawText);
      console.log("Parsed Gemini API data:", data);
  
      // Extract the answer from candidates[0].content.parts[0].text
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return answer || "No answer provided by Gemini API.";
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      return "Error: Unable to get answer.";
    }
  };
  