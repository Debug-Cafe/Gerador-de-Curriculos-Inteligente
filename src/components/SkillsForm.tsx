import { useState } from "react";

interface Skill {
  id: string;
  name: string;
  level: string;
}

const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

function SkillsForm() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Iniciante");

  const addSkill = () => {
    if (skillName.trim() === "") return;
    setSkills([
      ...skills,
      { id: generateUniqueId(), name: skillName, level: skillLevel },
    ]);
    setSkillName("");
    setSkillLevel("Iniciante");
  };

  const removeSkill = (idToRemove: string) => {
    setSkills(skills.filter((skill) => skill.id !== idToRemove));
  };

  return (
    <div>
      <h2>Habilidades</h2>
      <div>
        <input
          type="text"
          placeholder="Nome da habilidade"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
        <select
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
        >
          <option>Iniciante</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <button type="button" onClick={addSkill}>
          Adicionar
        </button>
      </div>

      <ul>
        {skills.map((skill) => (
          // Use o ID como a `key`
          <li key={skill.id}>
            {skill.name} - {skill.level}{" "}
            {/* Passe o ID para a função de remover */}
            <button type="button" onClick={() => removeSkill(skill.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillsForm;
