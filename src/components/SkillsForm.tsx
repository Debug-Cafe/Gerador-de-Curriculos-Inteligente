import { useState } from "react";

interface Skill {
  id: string;
  name: string;
  level: "Básico" | "Intermediário" | "Avançado";
}

interface SkillsFormProps {
  skillsList: Skill[];
  onAddSkill: (newSkill: Omit<Skill, 'id'>) => void;
  onRemoveSkill: (idToRemove: string) => void;
}

const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

function SkillsForm({ skillsList, onAddSkill, onRemoveSkill }: SkillsFormProps) {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState<"Básico" | "Intermediário" | "Avançado">("Básico");

  const handleAddClick = () => {
    if (skillName.trim() === "") return;
    
    onAddSkill({ name: skillName, level: skillLevel });

    setSkillName("");
    setSkillLevel("Básico");
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
          onChange={(e) => setSkillLevel(e.target.value as "Básico" | "Intermediário" | "Avançado")}
        >
          <option>Básico</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <button type="button" onClick={handleAddClick}>
          Adicionar
        </button>
      </div>

      <ul>
        {skillsList.map((skill) => (
          <li key={skill.id}>
            {skill.name} - {skill.level}{" "}
            <button type="button" onClick={() => onRemoveSkill(skill.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillsForm;
