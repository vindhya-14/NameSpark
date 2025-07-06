import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchTeamNames = async (prompt) => {
  const res = await axios.post(`${API_BASE}/api/team/generate`, {
    prompt,
  });
  return res.data.names;
};
