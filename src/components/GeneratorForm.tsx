import PersonalInformation from "./PersonalInformation";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";

function GeneratorForm() {
  return (
    <div className="flex-col">
      <PersonalInformation/>
      <SkillsForm/>
      <ExperienceForm/>
    </div>
  );
}

export default GeneratorForm;