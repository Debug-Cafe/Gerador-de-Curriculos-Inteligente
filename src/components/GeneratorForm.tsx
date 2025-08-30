import { useState } from "react";
import PersonalInformationForm from "./PersonalInformationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import Visualizer from "./Visualizer";

// Interfaces de tipo para todas as seções do currículo
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

interface Skill {
  id: string;
  name: string;
  level: "Básico" | "Intermediário" | "Avançado";
}

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

// Interface para o estado completo do currículo
interface CurriculumData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experiences: Experience[];
}

const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

function GeneratorForm() {
  const [curriculumData, setCurriculumData] = useState<CurriculumData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      summary: "",
    },
    skills: [],
    experiences: [],
  });

  // Funções de atualização para cada seção
  const handlePersonalInfoChange = (newInfo: PersonalInfo) => {
    setCurriculumData(prevData => ({ ...prevData, personalInfo: newInfo }));
  };

  const handleAddSkill = (newSkill: Omit<Skill, 'id'>) => {
    const newSkillWithId = { ...newSkill, id: generateUniqueId() };
    setCurriculumData(prevData => ({
      ...prevData,
      skills: [...prevData.skills, newSkillWithId],
    }));
  };

  const handleRemoveSkill = (idToRemove: string) => {
    setCurriculumData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter(skill => skill.id !== idToRemove),
    }));
  };

  const handleAddExperience = (newExperience: Omit<Experience, 'id'>) => {
    const newExperienceWithId = { ...newExperience, id: generateUniqueId() };
    setCurriculumData(prevData => ({
      ...prevData,
      experiences: [...prevData.experiences, newExperienceWithId],
    }));
  };

  const handleRemoveExperience = (idToRemove: string) => {
    setCurriculumData(prevData => ({
      ...prevData,
      experiences: prevData.experiences.filter(exp => exp.id !== idToRemove),
    }));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-8 overflow-y-auto">
        <PersonalInformationForm
          personalInfo={curriculumData.personalInfo}
          onPersonalInfoChange={handlePersonalInfoChange}
        />
        <SkillsForm
          skillsList={curriculumData.skills}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
        />
        <ExperienceForm
          experiencesList={curriculumData.experiences}
          onAddExperience={handleAddExperience}
          onRemoveExperience={handleRemoveExperience}
        />
      </div>
      <div className="w-1/2">
        <Visualizer curriculumData={curriculumData} />
      </div>
    </div>
  );
}

export default GeneratorForm;