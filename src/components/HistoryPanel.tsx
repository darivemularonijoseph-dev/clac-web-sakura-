import { HistoryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, X } from 'lucide-react';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClear: () => void;
  onSelect: (item: HistoryItem) => void;
}

export default function HistoryPanel({ isOpen, onClose, history, onClear, onSelect }: HistoryPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-pink-900/10 backdrop-blur-[2px] z-20 rounded-3xl"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 h-[70%] bg-white/90 backdrop-blur-xl border-t border-pink-100 rounded-t-3xl z-30 flex flex-col shadow-[0_-10px_40px_rgba(252,231,243,0.5)]"
          >
            <div className="flex items-center justify-between p-5 border-b border-pink-100">
              <h3 className="font-medium text-pink-900 text-lg flex items-center gap-2">
                History
              </h3>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={onClear}
                    className="p-2 text-pink-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-pink-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {history.length === 0 ? (
                <div className="h-full flex items-center justify-center text-pink-300 font-medium">
                  No history yet
                </div>
              ) : (
                history.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => onSelect(item)}
                    className="group flex flex-col items-end cursor-pointer p-4 rounded-2xl hover:bg-pink-50/80 transition-colors"
                  >
                    <span className="text-pink-400/80 text-sm mb-1 font-mono tracking-wider">{item.equation}</span>
                    <span className="text-pink-900 text-2xl font-medium">{item.result}</span>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
