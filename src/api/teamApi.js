import axios from "axios";

export const fetchTeamNames = async (prompt) => {
  const res = await axios.post("http://localhost:5000/api/team/generate", {
    prompt,
  });
  return res.data.names;
};
