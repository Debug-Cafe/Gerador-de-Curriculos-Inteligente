import GeneratorForm from "../components/GeneratorForm";

function Generator() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <GeneratorForm />
      </div>
      <div className="w-1/2">
      </div>
    </div>
  );
}

export default Generator;