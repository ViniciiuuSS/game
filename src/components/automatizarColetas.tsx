import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function AutomatizarColetas() {
  return (
    <div className="container-buttons flex flex-row gap-4">
        <button className="retro-button text-lg red-button"><ArrowPathIcon className="w-15 h-5 text-green-300" /> A</button>
        <button className="retro-button text-lg yellow-button" disabled><ArrowPathIcon className="w-15 h-5 text-green-300" /> B</button>
        <button className="retro-button text-lg green-button" disabled><ArrowPathIcon className="w-15 h-5 text-green-300" /> X</button>
        <button className="retro-button text-lg blue-button" disabled><ArrowPathIcon className="w-15 h-5 text-green-300" /> Y</button>
    </div>
  );
}
