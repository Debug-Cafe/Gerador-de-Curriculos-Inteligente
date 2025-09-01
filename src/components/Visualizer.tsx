interface VisualizerProps {
  personalData?: {
    nome?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    extras?: string[];
  };
  education?: { instituicao: string; curso: string }[];
  skills?: { habilidade: string; nivel: string }[];
  experiences?: { empresa: string; cargo: string }[];
}

function Visualizer({ personalData, education, skills, experiences }: VisualizerProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 overflow-y-auto max-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Currículo</h1>

      {/* DADOS PESSOAIS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-2 mb-2">Dados Pessoais</h2>
        {personalData ? (
          <div>
            {personalData.nome && <p><strong>Nome:</strong> {personalData.nome}</p>}
            {personalData.email && <p><strong>Email:</strong> {personalData.email}</p>}
            {personalData.telefone && <p><strong>Telefone:</strong> {personalData.telefone}</p>}
            {personalData.endereco && <p><strong>Endereço:</strong> {personalData.endereco}</p>}
            {personalData.extras?.map((e, i) => (
              <p key={i}><strong>Extra:</strong> {e}</p>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhum dado pessoal informado.</p>
        )}
      </section>

      {/* EDUCAÇÃO */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-2 mb-2">Educação</h2>
        {education && education.length > 0 ? (
          <ul className="list-disc ml-5">
            {education.map((edu, i) => (
              <li key={i}>
                <p><strong>Instituição:</strong> {edu.instituicao}</p>
                <p><strong>Curso:</strong> {edu.curso}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">Nenhuma formação adicionada.</p>
        )}
      </section>

      {/* SKILLS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-2 mb-2">Habilidades</h2>
        {skills && skills.length > 0 ? (
          <ul className="list-disc ml-5">
            {skills.map((skill, i) => (
              <li key={i}>
                {skill.habilidade} - {skill.nivel}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">Nenhuma habilidade adicionada.</p>
        )}
      </section>

      {/* EXPERIÊNCIA */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-2">Experiência</h2>
        {experiences && experiences.length > 0 ? (
          <ul className="list-disc ml-5">
            {experiences.map((exp, i) => (
              <li key={i}>
                <p><strong>Cargo:</strong> {exp.cargo}</p>
                <p><strong>Empresa:</strong> {exp.empresa}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">Nenhuma experiência adicionada.</p>
        )}
      </section>
    </div>
  );
}

export default Visualizer;
