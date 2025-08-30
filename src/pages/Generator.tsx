import GeneratorForm from "../components/GeneratorForm";
import Visualizer from "../components/Visualizer";

function Generator() {
  return (
    <div className="flex">
      <div className="w-1/2">
        <GeneratorForm />
      </div>
      <div className="w-1/2">
        <Visualizer />
      </div>
    </div>
  );
}

export default Generator;
