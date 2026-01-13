"use client";

import { useEffect } from "react";

interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  responsibilities: string[];
  color: string;
  isOrchestrator?: boolean;
}

interface AgentCardProps {
  agent: Agent;
  onClose: () => void;
}

export default function AgentCard({ agent, onClose }: AgentCardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Card */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full md:w-[500px] bg-secondary/95 backdrop-blur-xl border-l border-foreground/10 p-8 overflow-y-auto animate-slideInRight">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors duration-300"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6 text-foreground/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header with color accent */}
        <div className="mb-8 pb-6 border-b border-foreground/10">
          {/* Icon circle */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
            style={{ backgroundColor: `${agent.color}20` }}
          >
            {agent.isOrchestrator
              ? "🎯"
              : agent.id === "university-search"
                ? "🎓"
                : agent.id === "application-requirements"
                  ? "📋"
                  : agent.id === "scholarship-search"
                    ? "💰"
                    : agent.id === "scholarship-requirements"
                      ? "📊"
                      : agent.id === "essay-agent"
                        ? "✍️"
                        : "🌍"}
          </div>

          <h3
            id="agent-title"
            className="text-2xl font-bold text-foreground mb-1"
            style={{ color: agent.color }}
          >
            {agent.name}
          </h3>
          <p className="text-sm text-foreground/60 font-medium mb-3">
            {agent.role}
          </p>
          <p
            id="agent-description"
            className="text-foreground/80 leading-relaxed"
          >
            {agent.description}
          </p>
        </div>

        {/* Responsibilities */}
        <div>
          <h4 className="text-lg font-bold text-foreground mb-4">
            Key Responsibilities
          </h4>
          <ul className="space-y-3">
            {agent.responsibilities.map((responsibility, index) => (
              <li
                key={index}
                className="flex gap-3 items-start group"
              >
                <div
                  className="mt-1.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-300"
                  style={{
                    backgroundColor: `${agent.color}30`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: agent.color }}
                  />
                </div>
                <span className="text-foreground/80 text-sm leading-relaxed">
                  {responsibility}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-foreground/10">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 rounded-lg border border-primary/30 text-primary hover:border-primary font-medium transition-colors duration-300"
          >
            Close (Esc)
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
