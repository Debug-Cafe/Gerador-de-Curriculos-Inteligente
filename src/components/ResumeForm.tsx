import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Visualizer from "./Visualizer";

function ResumeForm() {
  const [pessoal, setPessoal] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    linkedin: "",
    resumo: "",
  });

  const [educacao, setEducacao] = useState<string[]>([""]);
  const [skills, setSkills] = useState<{ habilidade: string; nivel: string }[]>([{ habilidade: "", nivel: "Básico" }]);
  const [experiencia, setExperiencia] = useState<
    {
      empresa: string;
      cargo: string;
      dataInicio: string;
      dataFim: string;
      descricao: string;
      trabalhoAtual: boolean;
    }[]
  >([{ empresa: "", cargo: "", dataInicio: "", dataFim: "", descricao: "", trabalhoAtual: false }]);

  const visualizerRef = useRef<HTMLDivElement>(null);

  const handlePessoalChange = (field: keyof typeof pessoal, value: string) => {
    setPessoal({ ...pessoal, [field]: value });
  };

  const handleSkillsChange = (index: number, field: "habilidade" | "nivel", value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const handleExperienciaChange = (index: number, field: "empresa" | "cargo" | "dataInicio" | "dataFim" | "descricao", value: string) => {
    const updatedExperiencia = [...experiencia];
    updatedExperiencia[index][field] = value;
    setExperiencia(updatedExperiencia);
  };

  const handleCheckboxChange = (index: number, value: boolean) => {
    const updatedExperiencia = [...experiencia];
    updatedExperiencia[index].trabalhoAtual = value;
    setExperiencia(updatedExperiencia);
  };

  const handleDynamicChange = (section: "educacao", index: number, value: string) => {
    if (section === "educacao") {
      const updated = [...educacao];
      updated[index] = value;
      setEducacao(updated);
    }
  };

  const addInput = (section: "educacao" | "skills" | "experiencia") => {
    if (section === "educacao") setEducacao([...educacao, ""]);
    if (section === "skills") setSkills([...skills, { habilidade: "", nivel: "Básico" }]);
    if (section === "experiencia") setExperiencia([...experiencia, { empresa: "", cargo: "", dataInicio: "", dataFim: "", descricao: "", trabalhoAtual: false }]);
  };

  const removeInput = (section: "educacao" | "skills" | "experiencia", index: number) => {
    if (section === "educacao") setEducacao(educacao.filter((_, i) => i !== index));
    if (section === "skills") setSkills(skills.filter((_, i) => i !== index));
    if (section === "experiencia") setExperiencia(experiencia.filter((_, i) => i !== index));
  };

  const generatePDF = async () => {
    if (!visualizerRef.current) {
      console.error("Visualizer element not found.");
      return;
    }

    const element = visualizerRef.current;
    await new Promise((resolve) => setTimeout(resolve, 50));
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let positionY = 0;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      pdf.addPage();
      positionY = -pageHeight + heightLeft;
      pdf.addImage(imgData, "PNG", 0, positionY, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`curriculo_${pessoal.nome || "sem_nome"}.pdf`);
  };

  const formData = { pessoal, educacao, skills, experiencia };

  return (
    <div className="h-screen w-full bg-[#F1DAAE] flex flex-col items-center justify-center p-6 gap-8 overflow-hidden">
      <div className="flex w-full max-w-7xl gap-8">
        <div className="w-[calc(50%-1rem)] flex flex-col items-start gap-6 p-6 bg-[#F1DAAE] border border-[#D9B9A0] rounded-2xl shadow-md overflow-y-auto max-h-[90vh]">
          <div className="w-full space-y-4 mb-6 p-4 bg-[#E5CFA0] border border-[#D9B9A0] rounded-md">
            <h3 className="text-lg font-semibold border-b-2 border-[#A56734] pb-1 text-[#422718]">Dados Pessoais</h3>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Nome" value={pessoal.nome} onChange={(e) => handlePessoalChange("nome", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
              <input type="email" placeholder="Email" value={pessoal.email} onChange={(e) => handlePessoalChange("email", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
              <input type="text" placeholder="Telefone" value={pessoal.telefone} onChange={(e) => handlePessoalChange("telefone", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
              <input type="text" placeholder="Endereço" value={pessoal.endereco} onChange={(e) => handlePessoalChange("endereco", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
              <input type="text" placeholder="LinkedIn" value={pessoal.linkedin} onChange={(e) => handlePessoalChange("linkedin", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
              <textarea placeholder="Resumo profissional" value={pessoal.resumo} onChange={(e) => handlePessoalChange("resumo", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2 resize-none" rows={4} />
            </div>
          </div>
          <div className="w-full space-y-4 mb-6 p-4 bg-[#E5CFA0] border border-[#D9B9A0] rounded-md">
            <h3 className="text-lg font-semibold border-b-2 border-[#A56734] pb-1 text-[#422718]">Educação</h3>
            <div className="flex flex-col gap-4">
              {educacao.map((value, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="text" placeholder="Instituição e curso" value={value} onChange={(e) => handleDynamicChange("educacao", i, e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
                  <button type="button" onClick={() => removeInput("educacao", i)} className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">-</button>
                </div>
              ))}
              <div className="flex justify-center mt-2">
                <button type="button" onClick={() => addInput("educacao")} className="px-3 py-1 bg-gradient-to-r from-[#A05135] to-[#A56734] hover:from-[#422718] hover:to-[#422718] text-white rounded-full text-sm">+ Adicionar educação</button>
              </div>
            </div>
          </div>
          <div className="w-full space-y-4 mb-6 p-4 bg-[#E5CFA0] border border-[#D9B9A0] rounded-md">
            <h3 className="text-lg font-semibold border-b-2 border-[#A56734] pb-1 text-[#422718]">Habilidades</h3>
            <div className="flex flex-col gap-4">
              {skills.map((skill, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="text" placeholder="Habilidade" value={skill.habilidade} onChange={(e) => handleSkillsChange(i, "habilidade", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
                  <select value={skill.nivel} onChange={(e) => handleSkillsChange(i, "nivel", e.target.value)} className="w-2/3 border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2 bg-white text-[#422718]">
                    <option value="Básico">Básico</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                  <button type="button" onClick={() => removeInput("skills", i)} className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">-</button>
                </div>
              ))}
              <div className="flex justify-center mt-2">
                <button type="button" onClick={() => addInput("skills")} className="px-3 py-1 bg-gradient-to-r from-[#A05135] to-[#A56734] hover:from-[#422718] hover:to-[#422718] text-white rounded-full text-sm">+ Adicionar habilidade</button>
              </div>
            </div>
          </div>
          <div className="w-full space-y-4 mb-6 p-4 bg-[#E5CFA0] border border-[#D9B9A0] rounded-md">
            <h3 className="text-lg font-semibold border-b-2 border-[#A56734] pb-1 text-[#422718]">Experiência</h3>
            <div className="flex flex-col gap-4">
              {experiencia.map((exp, i) => (
                <div key={i} className="flex flex-col gap-2 p-4 bg-[#F0E0C2] border border-[#D9B9A0] rounded-md">
                  <input type="text" placeholder="Empresa" value={exp.empresa} onChange={(e) => handleExperienciaChange(i, "empresa", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
                  <input type="text" placeholder="Cargo" value={exp.cargo} onChange={(e) => handleExperienciaChange(i, "cargo", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
                  <div className="flex gap-2 items-center">
                    <label className="text-sm font-semibold text-[#422718]">Início</label>
                    <input type="date" value={exp.dataInicio} onChange={(e) => handleExperienciaChange(i, "dataInicio", e.target.value)} className="border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2" />
                    <label className="text-sm font-semibold text-[#422718]">Fim</label>
                    <input type="date" value={exp.dataFim} onChange={(e) => handleExperienciaChange(i, "dataFim", e.target.value)} disabled={exp.trabalhoAtual} className="border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2 bg-gray-100" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={exp.trabalhoAtual} onChange={(e) => handleCheckboxChange(i, e.target.checked)} />
                    <label>Trabalho atual</label>
                  </div>
                  <textarea placeholder="Descrição" value={exp.descricao} onChange={(e) => handleExperienciaChange(i, "descricao", e.target.value)} className="w-full border-b-2 border-[#A56734] focus:border-[#422718] outline-none p-2 resize-none" rows={4} />
                  <div className="flex justify-center mt-2">
                    <button type="button" onClick={() => removeInput("experiencia", i)} className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">-</button>
                  </div>
                </div>
              ))}
              <div className="flex justify-center mt-2">
                <button type="button" onClick={() => addInput("experiencia")} className="px-3 py-1 bg-gradient-to-r from-[#A05135] to-[#A56734] hover:from-[#422718] hover:to-[#422718] text-white rounded-full text-sm">+ Adicionar experiência</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[calc(50%-1rem)] sm:block flex items-center justify-center">
          <Visualizer formData={formData} ref={visualizerRef} />
        </div>
      </div>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <button onClick={generatePDF} className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#A05135] to-[#A56734] hover:from-[#422718] hover:to-[#422718] transition">Gerar PDF</button>
      </div>
    </div>
  );
}

export default ResumeForm;
