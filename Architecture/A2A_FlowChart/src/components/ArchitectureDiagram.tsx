import { useState } from "react";
import { motion } from "motion/react";
import { 
  Database, 
  MessageSquare, 
  IdCard, 
  Package, 
  FileCode, 
  Puzzle,
  Send,
  Radio,
  ListChecks,
  XCircle,
  User,
  Code2,
  Server,
  Globe,
  Settings
} from "lucide-react";
import { LayerCard } from "./LayerCard";
import { NodeCard } from "./NodeCard";

export function ArchitectureDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const dataModelNodes = [
    { id: "task", label: "Task", icon: ListChecks, description: "Task representation and lifecycle management" },
    { id: "message", label: "Message", icon: MessageSquare, description: "Structured message format for agent communication" },
    { id: "agentcard", label: "AgentCard", icon: IdCard, description: "Agent metadata and capabilities" },
    { id: "part", label: "Part", icon: Package, description: "Message components and attachments" },
    { id: "artifact", label: "Artifact", icon: FileCode, description: "Generated content and outputs" },
    { id: "extension", label: "Extension", icon: Puzzle, description: "Custom extensions and plugins" },
  ];

  const operationsNodes = [
    { id: "send", label: "Send Message", icon: Send, description: "Send a message to an agent" },
    { id: "stream", label: "Stream Message", icon: Radio, description: "Stream real-time message updates" },
    { id: "gettask", label: "Get Task", icon: Database, description: "Retrieve task information" },
    { id: "listtasks", label: "List Tasks", icon: ListChecks, description: "List all available tasks" },
    { id: "cancel", label: "Cancel Task", icon: XCircle, description: "Cancel a running task" },
    { id: "getagent", label: "Get Agent Card", icon: User, description: "Retrieve agent metadata" },
  ];

  const bindingsNodes = [
    { id: "jsonrpc", label: "JSON-RPC Methods", icon: Code2, description: "JSON-RPC 2.0 protocol implementation" },
    { id: "grpc", label: "gRPC RPCs", icon: Server, description: "gRPC service definitions" },
    { id: "http", label: "HTTP/REST Endpoints", icon: Globe, description: "RESTful API endpoints" },
    { id: "custom", label: "Custom Bindings", icon: Settings, description: "Custom protocol implementations" },
  ];

  return (
    <div className="space-y-8">
      {/* Data Model Layer */}
      <LayerCard
        title="A2A Data Model"
        color="blue"
        delay={0}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {dataModelNodes.map((node, index) => (
            <NodeCard
              key={node.id}
              {...node}
              isHovered={hoveredNode === node.id}
              onHover={() => setHoveredNode(node.id)}
              onLeave={() => setHoveredNode(null)}
              delay={index * 0.1}
              color="blue"
            />
          ))}
        </div>
      </LayerCard>

      {/* Connecting Arrow */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-0.5 h-12 bg-gradient-to-b from-blue-300 to-purple-300 rounded-full relative"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full" />
        </motion.div>
      </div>

      {/* Operations Layer */}
      <LayerCard
        title="A2A Operations"
        color="purple"
        delay={0.3}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {operationsNodes.map((node, index) => (
            <NodeCard
              key={node.id}
              {...node}
              isHovered={hoveredNode === node.id}
              onHover={() => setHoveredNode(node.id)}
              onLeave={() => setHoveredNode(null)}
              delay={0.3 + index * 0.1}
              color="purple"
            />
          ))}
        </div>
      </LayerCard>

      {/* Connecting Arrow */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="w-0.5 h-12 bg-gradient-to-b from-purple-300 to-green-300 rounded-full relative"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full" />
        </motion.div>
      </div>

      {/* Protocol Bindings Layer */}
      <LayerCard
        title="Protocol Bindings"
        color="green"
        delay={0.6}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bindingsNodes.map((node, index) => (
            <NodeCard
              key={node.id}
              {...node}
              isHovered={hoveredNode === node.id}
              onHover={() => setHoveredNode(node.id)}
              onLeave={() => setHoveredNode(null)}
              delay={0.6 + index * 0.1}
              color="green"
            />
          ))}
        </div>
      </LayerCard>
    </div>
  );
}
