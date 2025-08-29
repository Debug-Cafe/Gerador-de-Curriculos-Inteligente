import PersonalInformation from "../components/PersonalInformation";
import SkillsForm from "../components/SkillsForm";
import ExperienceForm from "../components/ExperienceForm";

function Generator() {
  return (
    <form>
     
      <PersonalInformation />
      <SkillsForm />
      <ExperienceForm />

    </form>
  );
}

export default Generator;
