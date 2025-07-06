import generateTeamNames from "../services/ai.service.js";

export const getTeamNames = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const names = await generateTeamNames(prompt);
    res.status(200).json({ names });
  } catch (error) {
    res.status(500).json({ error: "Gemini generation failed." });
  }
};
