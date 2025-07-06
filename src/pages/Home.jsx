import React, { useState } from "react";
import GeneratorForm from "../components/GeneratorForm";
import NameList from "../components/NameList";

const Home = () => {
  const [teamNames, setTeamNames] = useState([]);

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Team Name Generator 🎯</h1>
      <GeneratorForm onNamesGenerated={setTeamNames} />
      <NameList names={teamNames} />
    </div>
  );
};

export default Home;
