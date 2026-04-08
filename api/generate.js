export default async function handler(req, res) {
  try {
    const userPrompt = req.body?.prompt || "modern kitchen";

    const prompt = `
Modern kitchen design based on user preferences:
${userPrompt}

Ultra realistic, high-end interior, 4k render, unique design
`;

    const response = await fetch("https://api.openai.com/v1/images", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-image-1",
    input: prompt,
    size: "1024x1024"
  })
});

const text = await response.text(); // 👈 важно!
const data = JSON.parse(text);

    // 🔥 ТУК Е ВАЖНОТО:
    const base64Image = data.data[0].b64_json;

    return res.status(200).json({
      image_url: "data:image/png;base64," + base64Image
    });

  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
      details: error.message
    });
  }
}
