import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResumeForm() {
  const [tab, setTab] = useState<"pessoal" | "educacao" | "skills" | "experiencia">("pessoal");

  const [pessoal, setPessoal] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    linkedin: "",
  });

  const [educacao, setEducacao] = useState<string[]>([""]);
  const [skills, setSkills] = useState<string[]>([""]);
  const [experiencia, setExperiencia] = useState<string[]>([""]);

  const [formData, setFormData] = useState({
    pessoal,
    educacao,
    skills,
    experiencia,
  });

  // Ref para pegar o Visualizer no DOM para gerar PDF
  const visualizerRef = useRef<HTMLDivElement>(null);

  const handlePessoalChange = (field: keyof typeof pessoal, value: string) => {
    setPessoal({ ...pessoal, [field]: value });
  };

  const addInput = (section: "educacao" | "skills" | "experiencia") => {
    if (section === "educacao") setEducacao([...educacao, ""]);
    if (section === "skills") setSkills([...skills, ""]);
    if (section === "experiencia") setExperiencia([...experiencia, ""]);
  };

  const handleDynamicChange = (
    section: "educacao" | "skills" | "experiencia",
    index: number,
    value: string
  ) => {
    const updateSection = (arr: string[]) => {
      const updated = [...arr];
      updated[index] = value;
      return updated;
    };

    if (section === "educacao") setEducacao(updateSection(educacao));
    if (section === "skills") setSkills(updateSection(skills));
    if (section === "experiencia") setExperiencia(updateSection(experiencia));
  };

  const handleSave = () => {
    setFormData({
      pessoal,
      educacao,
      skills,
      experiencia,
    });
  };

  // Função para gerar PDF do Visualizer
  const generatePDF = async () => {
    if (!visualizerRef.current) return;

    // Captura o visualizer como canvas
    const canvas = await html2canvas(visualizerRef.current, {
      scale: 2, // melhor resolução
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    // Dimensões A4 em pts: 595 x 842 aproximadamente
    // Vamos ajustar a imagem para caber na largura da página com proporção
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`curriculo_${formData.pessoal.nome || "sem_nome"}.pdf`);
  };

  // Para scroll nos inputs se mais de 2
  const getInputContainerClass = (arr: string[]) => {
    return arr.length > 2
      ? "flex flex-col gap-4 max-h-52 overflow-y-auto"
      : "flex flex-col gap-4";
  };

  return (
    <div className="h-screen w-full bg-[#F1DAAE] flex flex-col items-center justify-center p-6 gap-8 overflow-hidden">
      <div className="flex w-full max-w-7xl gap-8">
        {/* Formulário - lado esquerdo */}
        <div className="w-full max-w-xl flex flex-col items-start justify-center gap-6 p-6 bg-[#F1DAAE] border border-[#D9B9A0] rounded-2xl shadow-md overflow-auto max-h-[90vh]">
          {/* Tabs */}
          <div className="w-full">
            <p className="text-sm font-medium text-[#422718] mb-3">
              Preencha seu currículo:
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { id: "pessoal", label: "Pessoal" },
                { id: "educacao", label: "Educação" },
                { id: "skills", label: "Skills" },
                { id: "experiencia", label: "Experiência" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setTab(id as any)}
                  className={`px-4 py-2 rounded-xl font-medium border transition-all ${
                    tab === id
                      ? "bg-[#422718] text-white border-[#422718]"
                      : "bg-[#D9B9A0] text-[#422718] border-[#A56734] hover:bg-[#A05135] hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="w-full space-y-4">
            {tab === "pessoal" && (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nome"
                  value={pessoal.nome}
                  onChange={(e) => handlePessoalChange("nome", e.target.value)}
                  className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={pessoal.email}
                  onChange={(e) => handlePessoalChange("email", e.target.value)}
                  className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2"
                />
                <input
                  type="text"
                  placeholder="Telefone"
                  value={pessoal.telefone}
                  onChange={(e) => handlePessoalChange("telefone", e.target.value)}
                  className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2"
                />
                <input
                  type="text"
                  placeholder="Endereço"
                  value={pessoal.endereco}
                  onChange={(e) => handlePessoalChange("endereco", e.target.value)}
                  className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2"
                />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  value={pessoal.linkedin}
                  onChange={(e) => handlePessoalChange("linkedin", e.target.value)}
                  className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2"
                />
              </div>
            )}

            {["educacao", "skills", "experiencia"].includes(tab) && (
              <div className={getInputContainerClass(
                tab === "educacao" ? educacao : tab === "skills" ? skills : experiencia
              )}>
                {(tab === "educacao" ? educacao : tab === "skills" ? skills : experiencia).map((value, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={
                      tab === "educacao"
                        ? "Instituição e curso"
                        : tab === "skills"
                        ? "Habilidade e nível"
                        : "Empresa e cargo"
                    }
                    value={value}
                    onChange={(e) => handleDynamicChange(tab, i, e.target.value)}
                    className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addInput(tab)}
                  className="mx-auto px-4 py-2 rounded-xl border border-[#A56734] text-[#422718] hover:bg-[#A05135] hover:text-white transition"
                >
                  + Adicionar mais
                </button>
              </div>
            )}
          </div>

          {/* Botão salvar */}
          <button
            onClick={handleSave}
            type="button"
            className="w-full py-3 rounded-xl font-semibold text-white transition flex items-center justify-center gap-2 bg-gradient-to-r from-[#A05135] to-[#A56734] hover:from-[#422718] hover:to-[#422718]"
          >
            <span>Salvar</span>
          </button>
        </div>

        {/* Visualizador - lado direito */}
        <div className="hidden sm:block">
          <Visualizer formData={formData} ref={visualizerRef} />
        </div>
      </div>

      {/* Botão gerar PDF - centralizado embaixo da tela */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <button
          onClick={generatePDF}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#A05135] to-[#A56734] hover:from-[#422718] hover:to-[#422718] transition"
        >
          Gerar PDF
        </button>
      </div>
    </div>
  );
}

const Visualizer = React.forwardRef<HTMLDivElement, { formData: any }>((props, ref) => {
  const { formData } = props;
  return (
    <div
      ref={ref}
      className="bg-white rounded-md p-6 overflow-y-auto"
      style={{
        width: 400,
        maxHeight: "100vh",
        boxSizing: "border-box",
        color: "#000",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 className="text-2xl font-bold mb-4">Currículo</h2>

      <div className="space-y-2 mb-6">
        <p><strong>Nome:</strong> {formData.pessoal.nome}</p>
        <p><strong>Email:</strong> {formData.pessoal.email}</p>
        <p><strong>Telefone:</strong> {formData.pessoal.telefone}</p>
        <p><strong>Endereço:</strong> {formData.pessoal.endereco}</p>
        <p><strong>LinkedIn:</strong> {formData.pessoal.linkedin}</p>
      </div>

      {formData.educacao.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Educação</h3>
          <ul className="list-disc ml-5">
            {formData.educacao.map((edu: string, i: number) => (
              <li key={i}>{edu}</li>
            ))}
          </ul>
        </section>
      )}

      {formData.skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <ul className="list-disc ml-5">
            {formData.skills.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {formData.experiencia.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Experiência</h3>
          <ul className="list-disc ml-5">
            {formData.experiencia.map((exp: string, i: number) => (
              <li key={i}>{exp}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});

export default ResumeForm;
