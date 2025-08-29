import { useState } from "react";

interface Experience {
  id: string;  
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

function ExperienceForm() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const addExperience = () => {
    if (role.trim() === "" || company.trim() === "") return;

    setExperiences([
      ...experiences,
      { id: generateUniqueId(), role, company, startDate, endDate, description },
    ]);

    setRole("");
    setCompany("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  const removeExperience = (idToRemove: string) => {
  setExperiences(experiences.filter((exp) => exp.id !== idToRemove));
};

  return (
    <div>
      <h2>Experiências Profissionais</h2>

      <div>
        <input
          type="text"
          placeholder="Cargo"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="text"
          placeholder="Empresa"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="month"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="month"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <textarea
          placeholder="Descrição das atividades"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="button" onClick={addExperience}>
          Adicionar Experiência
        </button>
      </div>

      <ul>
        {experiences.map((exp) => (
          <li key={exp.id}>
            <strong>{exp.role}</strong> - {exp.company} <br />
            {exp.startDate} até {exp.endDate || "Atual"} <br />
            <em>{exp.description}</em>
            <br />
            <button type="button" onClick={() => removeExperience(exp.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceForm;
