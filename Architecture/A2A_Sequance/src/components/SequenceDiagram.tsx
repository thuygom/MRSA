import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Step {
  id: number;
  title: string;
  messages: Message[];
}

interface Message {
  from: string;
  to: string;
  text: string;
  type: 'request' | 'response' | 'note' | 'loop';
  subMessages?: Message[];
}

const steps: Step[] = [
  {
    id: 1,
    title: '1. Agent Discovery',
    messages: [
      { from: 'Client', to: 'A2A Server', text: 'GET agent card eg: /.well-known/agent-card', type: 'request' },
      { from: 'A2A Server', to: 'Client', text: 'Returns Agent Card', type: 'response' }
    ]
  },
  {
    id: 2,
    title: '2. Authentication',
    messages: [
      { from: 'Client', to: 'Client', text: 'Parse Agent Card for securitySchemes', type: 'note' },
      { from: 'Client', to: 'Auth Server', text: '[securityScheme is "OpenIdConnect"]\nRequest token based on "authorizationUrl" and "tokenUrl"', type: 'request' },
      { from: 'Auth Server', to: 'Client', text: 'Returns JWT', type: 'response' }
    ]
  },
  {
    id: 3,
    title: '3. sendMessage API',
    messages: [
      { from: 'Client', to: 'Client', text: 'Parse Agent Card for "url" param to send API requests to.', type: 'note' },
      { from: 'Client', to: 'A2A Server', text: 'POST /sendMessage (with JWT)', type: 'request' },
      { from: 'A2A Server', to: 'A2A Server', text: 'Process message and create task', type: 'note' },
      { from: 'A2A Server', to: 'Client', text: 'Returns Task Response', type: 'response' }
    ]
  },
  {
    id: 4,
    title: '4. sendMessageStream API',
    messages: [
      { from: 'Client', to: 'A2A Server', text: 'POST /sendMessageStream (with JWT)', type: 'request' },
      { from: 'A2A Server', to: 'Client', text: 'Stream: Task (Submitted)', type: 'response' },
      { from: 'A2A Server', to: 'Client', text: 'Stream: TaskStatusUpdateEvent (Working)', type: 'response' },
      { from: 'A2A Server', to: 'Client', text: 'Stream: TaskArtifactUpdateEvent (artifact A)', type: 'response' },
      { from: 'A2A Server', to: 'Client', text: 'Stream: TaskArtifactUpdateEvent (artifact B)', type: 'response' },
      { from: 'A2A Server', to: 'Client', text: 'Stream: TaskStatusUpdateEvent (Completed)', type: 'response' }
    ]
  }
];

export function SequenceDiagram() {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1]);
  
  const toggleStep = (stepId: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="w-full max-w-[1200px] aspect-[16/9] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Header with actors */}
      <div className="grid grid-cols-3 gap-4 p-4 border-b bg-blue-50">
        <ActorBox name="Client" />
        <ActorBox name="A2A Server" />
        <ActorBox name="Auth Server" />
      </div>

      {/* Steps accordion */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {steps.map((step) => (
          <StepCard
            key={step.id}
            step={step}
            isExpanded={expandedSteps.includes(step.id)}
            onToggle={() => toggleStep(step.id)}
          />
        ))}
      </div>

      {/* Footer with actors */}
      <div className="grid grid-cols-3 gap-4 p-4 border-t bg-blue-50">
        <ActorBox name="Client" />
        <ActorBox name="A2A Server" />
        <ActorBox name="Auth Server" />
      </div>
    </div>
  );
}

function ActorBox({ name }: { name: string }) {
  return (
    <div className="bg-white border-2 border-blue-400 rounded px-3 py-2 text-center">
      {name}
    </div>
  );
}

function StepCard({ step, isExpanded, onToggle }: { 
  step: Step; 
  isExpanded: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="border rounded-lg overflow-hidden bg-blue-50">
      <button
        onClick={onToggle}
        className="w-full px-4 py-2 flex items-center justify-between hover:bg-blue-100 transition-colors"
      >
        <span>{step.title}</span>
        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-2 space-y-2 bg-white">
              {step.messages.map((message, idx) => (
                <MessageFlow key={idx} message={message} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MessageFlow({ message }: { message: Message }) {
  const getGridPosition = (actor: string) => {
    if (actor === 'Client') return 'col-start-1';
    if (actor === 'A2A Server') return 'col-start-2';
    if (actor === 'Auth Server') return 'col-start-3';
    return 'col-start-1';
  };

  const getArrowDirection = (from: string, to: string) => {
    const positions: Record<string, number> = {
      'Client': 1,
      'A2A Server': 2,
      'Auth Server': 3
    };
    return positions[from] < positions[to] ? 'right' : 'left';
  };

  if (message.type === 'note' || message.from === message.to) {
    return (
      <div className={`grid grid-cols-3 gap-4`}>
        <div className={`${getGridPosition(message.from)} bg-gray-100 border border-gray-300 rounded p-2 text-sm whitespace-pre-line`}>
          {message.text}
        </div>
      </div>
    );
  }

  const direction = getArrowDirection(message.from, message.to);
  const fromPos = getGridPosition(message.from);
  const toPos = getGridPosition(message.to);

  return (
    <div className="relative py-2">
      <div className="grid grid-cols-3 gap-4 items-center">
        {message.from === 'Client' && (
          <>
            <div className="col-start-1" />
            <div className="col-start-2 col-span-2 relative">
              <div className="flex items-center">
                <div className="flex-1 border-t-2 border-blue-500 relative">
                  <div className="absolute right-0 top-0 transform translate-x-1 -translate-y-1">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-blue-500 border-b-4 border-b-transparent" />
                  </div>
                </div>
              </div>
              <div className="text-xs mt-1 text-gray-700">{message.text}</div>
            </div>
          </>
        )}
        
        {message.from === 'A2A Server' && message.to === 'Client' && (
          <>
            <div className="col-start-1 col-span-2 relative">
              <div className="flex items-center">
                <div className="flex-1 border-t-2 border-dotted border-blue-500 relative">
                  <div className="absolute left-0 top-0 transform -translate-x-1 -translate-y-1">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-r-8 border-r-blue-500 border-b-4 border-b-transparent" />
                  </div>
                </div>
              </div>
              <div className="text-xs mt-1 text-gray-700">{message.text}</div>
            </div>
            <div className="col-start-3" />
          </>
        )}

        {message.from === 'Client' && message.to === 'Auth Server' && (
          <>
            <div className="col-start-1" />
            <div className="col-start-2 col-span-2 relative">
              <div className="flex items-center">
                <div className="flex-1 border-t-2 border-blue-500 relative">
                  <div className="absolute right-0 top-0 transform translate-x-1 -translate-y-1">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-blue-500 border-b-4 border-b-transparent" />
                  </div>
                </div>
              </div>
              <div className="text-xs mt-1 text-gray-700 whitespace-pre-line">{message.text}</div>
            </div>
          </>
        )}

        {message.from === 'Auth Server' && message.to === 'Client' && (
          <>
            <div className="col-start-1 col-span-2 relative">
              <div className="flex items-center">
                <div className="flex-1 border-t-2 border-dotted border-blue-500 relative">
                  <div className="absolute left-0 top-0 transform -translate-x-1 -translate-y-1">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-r-8 border-r-blue-500 border-b-4 border-b-transparent" />
                  </div>
                </div>
              </div>
              <div className="text-xs mt-1 text-gray-700">{message.text}</div>
            </div>
            <div className="col-start-3" />
          </>
        )}
      </div>
    </div>
  );
}
