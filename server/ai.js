import dotenv from "dotenv";
dotenv.config();

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.`;

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    console.log("GROQ REQUEST");

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: `I have ${ingredientsString}. Please suggest a recipe I could make with some or all of these ingredients.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", response.status, errorText);
      throw new Error(`Groq API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("GROQ RESPONSE received");

    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    }
    return "Sorry, I couldn't generate a recipe. Please try again.";
  } catch (err) {
    console.error("Groq error:", err);
    return `AI error: ${err.message}`;
  }
}
