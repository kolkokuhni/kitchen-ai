export default async function handler(req, res) {
  try {
    const userPrompt =
      req.method === "POST"
        ? req.body?.prompt
        : "modern luxury kitchen, white cabinets, wooden countertop";

    const prompt = `
Modern kitchen design:
${userPrompt}

Ultra realistic, high-end interior, 4k render, unique design
`;

    const response = await fetch("https://api.openai.com/v1/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024"
      })
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON from OpenAI",
        raw: text
      });
    }

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({
      image_url: data.data[0].url
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
