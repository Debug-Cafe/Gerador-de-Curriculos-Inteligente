import React, { useState } from 'react';

// Interface para a Experiência
interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

// Interface para as props do componente
interface ExperienceFormProps {
  experiencesList: Experience[];
  onAddExperience: (newExperience: Omit<Experience, 'id'>) => void;
  onRemoveExperience: (idToRemove: string) => void;
}

function ExperienceForm({ experiencesList, onAddExperience, onRemoveExperience }: ExperienceFormProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");

  const handleAddClick = () => {
    if (company.trim() === "" || position.trim() === "") return;

    // Cria o novo objeto de experiência sem o ID
    const newExperience = { company, position, period, description };

    // Chama a função do componente pai para atualizar o estado
    onAddExperience(newExperience);

    // Limpa os campos do formulário para o próximo item
    setCompany("");
    setPosition("");
    setPeriod("");
    setDescription("");
  };

  return (
    <div className="flex-col">
      <h2 className="text-xl font-bold mt-4">Experiências Profissionais</h2>
      <div className="flex flex-col gap-2 mt-2">
        <input
          type="text"
          name="company"
          placeholder="Empresa"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          name="position"
          placeholder="Cargo"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          name="period"
          placeholder="Período"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
        <textarea
          name="description"
          placeholder="Descrição das responsabilidades"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-20"
        />
        <button type="button" onClick={handleAddClick} className="w-fit">
          Adicionar Experiência
        </button>
      </div>

      <ul className="list-disc list-inside mt-4">
        {experiencesList.map((exp) => (
          <li key={exp.id} className="text-gray-700">
            <span className="font-medium">{exp.position}</span> em {exp.company} ({exp.period})
            <p className="text-sm italic">{exp.description}</p>
            <button type="button" onClick={() => onRemoveExperience(exp.id)} className="ml-2 text-red-500">
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceForm;