import { useState } from "react";


type Skill = {
  name: string;
  level: string;
};

function SkillsForm() {
  // Use o tipo "Skill[]" aqui
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Iniciante");

  const addSkill = () => {
    if (skillName.trim() === "") return;
    setSkills([...skills, { name: skillName, level: skillLevel }]);
    setSkillName("");
    setSkillLevel("Iniciante");
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
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
        {skills.map((skill, index) => (
          <li key={index}>
            {skill.name} - {skill.level}{" "}
            <button type="button" onClick={() => removeSkill(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillsForm;