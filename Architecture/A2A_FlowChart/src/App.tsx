import { ArchitectureDiagram } from "./components/ArchitectureDiagram";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-slate-900 mb-2">A2A Architecture Overview</h1>
          <p className="text-slate-600">Agent-to-Agent Communication Framework</p>
        </div>
        <ArchitectureDiagram />
      </div>
    </div>
  );
}
