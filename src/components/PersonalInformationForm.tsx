import React from 'react';

// Interface para os dados pessoais
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

// Interface para as props do componente
interface PersonalInformationFormProps {
  personalInfo: PersonalInfo;
  onPersonalInfoChange: (newInfo: PersonalInfo) => void;
}

function PersonalInformationForm({ personalInfo, onPersonalInfoChange }: PersonalInformationFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedInfo = {
      ...personalInfo,
      [name]: value,
    };
    onPersonalInfoChange(updatedInfo);
  };

  return (
    <div className="flex-col">
      <h2 className="text-xl font-bold">Dados Pessoais</h2>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={personalInfo.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={personalInfo.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefone"
          value={personalInfo.phone}
          onChange={handleChange}
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={personalInfo.linkedin}
          onChange={handleChange}
        />
      </div>
      <textarea
        name="summary"
        placeholder="Resumo Profissional"
        value={personalInfo.summary}
        onChange={handleChange}
        className="w-full mt-4 h-24"
      />
    </div>
  );
}

export default PersonalInformationForm;