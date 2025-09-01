import React from "react";

interface VisualizerProps {
  formData: {
    pessoal: {
      nome: string;
      email: string;
      telefone: string;
      endereco: string;
      linkedin: string;
      resumo: string;
    };
    educacao: string[];
    skills: { habilidade: string; nivel: string }[];
    experiencia: {
      empresa: string;
      cargo: string;
      dataInicio: string;
      dataFim: string;
      descricao: string;
      trabalhoAtual: boolean;
    }[];
  };
}

const Visualizer = React.forwardRef<HTMLDivElement, VisualizerProps>(
  ({ formData }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white rounded-md p-8 overflow-y-auto max-h-[90vh] w-full border border-[#D9B9A0] shadow-md"
        style={{
          boxSizing: "border-box",
          color: "#000",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center mb-6 pb-2 border-b-2 border-[#A56734]">
            Currículo
            {formData.pessoal.nome ? ` - ${formData.pessoal.nome}` : ""}
          </h2>
          {/* Dados pessoais */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-[#422718]">
              Dados Pessoais
            </h3>
            <p className="text-sm">
              <strong>Nome:</strong> {formData.pessoal.nome}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {formData.pessoal.email}
            </p>
            <p className="text-sm">
              <strong>Telefone:</strong> {formData.pessoal.telefone}
            </p>
            <p className="text-sm">
              <strong>Endereço:</strong> {formData.pessoal.endereco}
            </p>
            <p className="text-sm">
              <strong>LinkedIn:</strong> {formData.pessoal.linkedin}
            </p>
            <p className="text-sm">
              <strong>Resumo:</strong> {formData.pessoal.resumo}
            </p>
          </div>
          {/* Educação */}
          {formData.educacao.length > 0 && formData.educacao[0] !== "" && (
            <section className="mb-8">
              <h3 className="text-lg font-semibold pb-1 mb-2 border-b-2 border-[#A56734] text-[#422718]">
                Educação
              </h3>
              <ul className="space-y-1">
                {formData.educacao.map((edu, i) => (
                  <li key={i} className="text-sm">
                    {edu}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {/* Habilidades */}
          {formData.skills.length > 0 &&
            formData.skills[0].habilidade !== "" && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold pb-1 mb-2 border-b-2 border-[#A56734] text-[#422718]">
                  Habilidades
                </h3>
                <ul className="space-y-1">
                  {formData.skills.map((skill, i) => (
                    <li key={i} className="text-sm">
                      {skill.habilidade} - {skill.nivel}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          {/* Experiência */}
          {formData.experiencia.length > 0 &&
            formData.experiencia[0].empresa !== "" && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold pb-1 mb-2 border-b-2 border-[#A56734] text-[#422718]">
                  Experiência
                </h3>
                <div className="space-y-2">
                  {formData.experiencia.map((exp, i) => (
                    <div key={i} className="text-sm">
                      <p>
                        <strong>Cargo:</strong> {exp.cargo} |{" "}
                        <strong>Empresa:</strong> {exp.empresa}
                      </p>
                      <p>
                        <strong>Período:</strong> {exp.dataInicio} -{" "}
                        {exp.trabalhoAtual ? "Presente" : exp.dataFim}
                      </p>
                      <p>
                        <strong>Descrição:</strong> {exp.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
        </div>
      </div>
    );
  }
);

export default Visualizer;
