import { motion } from 'motion/react';

interface KeypadProps {
  onNumber: (num: string) => void;
  onOperator: (op: string) => void;
  onEqual: () => void;
  onClear: () => void;
  onDelete: () => void;
  onDecimal: () => void;
}

export default function Keypad({ onNumber, onOperator, onEqual, onClear, onDelete, onDecimal }: KeypadProps) {
  const buttons = [
    { label: 'C', action: onClear, type: 'action', color: 'text-pink-600 bg-pink-100 hover:bg-pink-200' },
    { label: 'DEL', action: onDelete, type: 'action', color: 'text-pink-600 bg-pink-100 hover:bg-pink-200' },
    { label: '%', action: () => onOperator('%'), type: 'operator', color: 'text-pink-600 bg-pink-100 hover:bg-pink-200' },
    { label: 'Ã·', action: () => onOperator('/'), type: 'operator', color: 'text-pink-600 bg-pink-200 hover:bg-pink-300' },

    { label: '7', action: () => onNumber('7'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '8', action: () => onNumber('8'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '9', action: () => onNumber('9'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: 'Ã', action: () => onOperator('*'), type: 'operator', color: 'text-pink-600 bg-pink-200 hover:bg-pink-300' },

    { label: '4', action: () => onNumber('4'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '5', action: () => onNumber('5'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '6', action: () => onNumber('6'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '-', action: () => onOperator('-'), type: 'operator', color: 'text-pink-600 bg-pink-200 hover:bg-pink-300' },

    { label: '1', action: () => onNumber('1'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '2', action: () => onNumber('2'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '3', action: () => onNumber('3'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '+', action: () => onOperator('+'), type: 'operator', color: 'text-pink-600 bg-pink-200 hover:bg-pink-300' },

    { label: '00', action: () => onNumber('00'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '0', action: () => onNumber('0'), type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '.', action: onDecimal, type: 'number', color: 'text-pink-900 bg-white/60 hover:bg-white' },
    { label: '=', action: onEqual, type: 'equal', color: 'text-white bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-200' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 p-6 pt-0">
      {buttons.map((btn, index) => (
        <motion.button
          key={index}
          whileTap={{ scale: 0.92 }}
          onClick={btn.action}
          className={`h-16 rounded-2xl text-2xl font-medium flex items-center justify-center transition-colors ${btn.color}`}
        >
          {btn.label}
        </motion.button>
      ))}
    </div>
  );
}
