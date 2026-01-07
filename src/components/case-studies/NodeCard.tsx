"use client";

import { useEffect } from "react";
import { PipelineNode } from "@/types/case-study";

interface NodeCardProps {
  node: PipelineNode;
  onClose: () => void;
}

export default function NodeCard({ node, onClose }: NodeCardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'input':
        return '📥';
      case 'research':
        return '🔍';
      case 'processing':
        return '⚙️';
      case 'analysis':
        return '🔬';
      case 'quality':
        return '✅';
      case 'output':
        return '📤';
      default:
        return '🔧';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full md:w-[600px] bg-secondary/95 backdrop-blur-xl border-l border-foreground/10 p-8 overflow-y-auto animate-slideInRight">
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
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
            style={{ backgroundColor: `${node.color}20` }}
          >
            {getCategoryEmoji(node.category)}
          </div>

          <h3
            className="text-2xl font-bold text-foreground mb-1"
            style={{ color: node.color }}
          >
            {node.name}
          </h3>
          <p className="text-sm text-foreground/60 font-medium mb-3">{node.role}</p>
          <p className="text-foreground/80 leading-relaxed mt-4">{node.description}</p>
        </div>

        {/* Inputs */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-foreground mb-4">Inputs</h4>
          <div className="space-y-3">
            {node.inputs.map((input, index) => (
              <div key={index} className="p-4 rounded-xl bg-secondary/30 border border-foreground/5">
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-sm font-mono text-primary">{input.name}</code>
                  <span className="text-xs text-foreground/40">({input.type})</span>
                </div>
                <p className="text-sm text-foreground/60">{input.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outputs */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-foreground mb-4">Outputs</h4>
          <div className="space-y-3">
            {node.outputs.map((output, index) => (
              <div key={index} className="p-4 rounded-xl bg-secondary/30 border border-foreground/5">
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-sm font-mono text-tertiary">{output.name}</code>
                  <span className="text-xs text-foreground/40">({output.type})</span>
                </div>
                <p className="text-sm text-foreground/60">{output.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-foreground/10">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors duration-300"
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
