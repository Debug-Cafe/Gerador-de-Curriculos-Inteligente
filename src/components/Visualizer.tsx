import React from 'react';

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

// O componente agora recebe o objeto completo `curriculumData`
interface VisualizerProps {
    curriculumData: CurriculumData;
}

function Visualizer({ curriculumData }: VisualizerProps) {
    return (
        <div className="p-8 bg-white rounded-lg shadow-lg h-screen overflow-y-auto">
            {/* Seção de Dados Pessoais */}
            <div className="pb-4 border-b-2 border-gray-200">
                <h1 className="text-3xl font-bold">{curriculumData.personalInfo.name}</h1>
                <p className="text-gray-600 mt-1">{curriculumData.personalInfo.summary}</p>
                <div className="flex flex-col text-sm text-gray-500 mt-2">
                    <span>{curriculumData.personalInfo.email}</span>
                    <span>{curriculumData.personalInfo.phone}</span>
                    <span>{curriculumData.personalInfo.linkedin}</span>
                </div>
            </div>

            {/* Seção de Experiências */}
            <div className="mt-6 pb-4 border-b-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Experiências Profissionais</h2>
                {curriculumData.experiences.length > 0 ? (
                    curriculumData.experiences.map((exp) => (
                        <div key={exp.id} className="mt-4">
                            <h3 className="text-lg font-semibold">{exp.position} em {exp.company}</h3>
                            <p className="text-sm text-gray-500">{exp.period}</p>
                            <p className="text-gray-700 mt-1">{exp.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic mt-2">Nenhuma experiência adicionada.</p>
                )}
            </div>

            {/* Seção de Habilidades */}
            <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800">Habilidades</h2>
                <ul className="list-disc list-inside mt-2">
                    {curriculumData.skills.length > 0 ? (
                        curriculumData.skills.map((skill) => (
                            <li key={skill.id} className="text-gray-700">
                                <span className="font-medium">{skill.name}</span> - {skill.level}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Adicione suas habilidades para visualizá-las aqui.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Visualizer;