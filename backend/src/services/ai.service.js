import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
    You are a highly creative and imaginative assistant specialized in generating unique, fun, and catchy team names tailored perfectly to any given theme, event, or team type. Your team names should be original, memorable, and evoke the spirit, energy, and personality of the theme or occasion. Avoid clichés and generic names; instead, craft names that spark excitement and connection. Return the output as a clean, plain-text list with no numbering or extra formatting—just the team names, each on its own line.
  `,
});

export default async function generateTeamNames(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw error;
  }
}
