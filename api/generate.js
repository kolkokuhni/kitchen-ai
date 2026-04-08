export default async function handler(req, res) {
  const prompt = `
  Modern kitchen design based on user preferences:
  ${req.body.prompt || "modern kitchen"}

  Ultra realistic, high-end interior, 4k render
  `;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
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

  const data = await response.json();

  res.status(200).json({
    image_url: data.data[0].url
  });
}
