import { useState } from 'react';
import { HistoryItem } from '../types';
import Keypad from './Keypad';
import HistoryPanel from './HistoryPanel';
import { motion } from 'motion/react';
import { History, Leaf } from 'lucide-react';

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [equationString, setEquationString] = useState<string>('');

  const calculate = (a: string, b: string, op: string): string => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return '';
    let result = 0;
    switch (op) {
      case '+': result = numA + numB; break;
      case '-': result = numA - numB; break;
      case '*': result = numA * numB; break;
      case '/': result = numB !== 0 ? numA / numB : NaN; break;
      case '%': result = numA % numB; break;
    }
    
    if (isNaN(result)) return 'Error';
    return String(Math.round(result * 10000000) / 10000000);
  };

  const handleNumber = (numStr: string) => {
    if (displayValue === 'Error') handleClear();
    
    if (waitingForNewValue) {
      setDisplayValue(numStr === '00' ? '0' : numStr);
      setWaitingForNewValue(false);
    } else {
      setDisplayValue(displayValue === '0' && numStr !== '00' ? numStr : displayValue + numStr);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplayValue('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperator = (nextOp: string) => {
    if (displayValue === 'Error') return;

    if (operator && !waitingForNewValue && previousValue) {
      const result = calculate(previousValue, displayValue, operator);
      setDisplayValue(result);
      setPreviousValue(result);
      setEquationString(`${result} ${nextOp}`);
    } else {
      setPreviousValue(displayValue);
      setEquationString(`${displayValue} ${nextOp}`);
    }
    setOperator(nextOp);
    setWaitingForNewValue(true);
  };

  const handleEqual = () => {
    if (!operator || !previousValue || waitingForNewValue || displayValue === 'Error') return;
    const result = calculate(previousValue, displayValue, operator);
    
    let opString = operator;
    if (operator === '*') opString = 'Ã—';
    if (operator === '/') opString = 'Ã·';
    
    const newEquation = `${previousValue} ${opString} ${displayValue} =`;
    setHistory(prev => [{
      id: Math.random().toString(36).substring(7),
      equation: newEquation,
      result: result,
      timestamp: Date.now()
    }, ...prev]);
    
    setDisplayValue(result);
    setEquationString(newEquation);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
    setEquationString('');
  };

  const handleDelete = () => {
    if (waitingForNewValue || displayValue === 'Error') return;
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setDisplayValue(item.result);
    setEquationString(item.equation);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
    setIsHistoryOpen(false);
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="relative w-full max-w-sm bg-white/60 backdrop-blur-2xl border border-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(244,114,182,0.3)] overflow-hidden z-10"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-2 relative z-10">
        <div className="flex items-center gap-2 text-pink-400">
          <Leaf size={18} className="drop-shadow-sm" />
          <span className="font-medium text-sm tracking-widest uppercase">Sakura</span>
        </div>
        <button 
          onClick={() => setIsHistoryOpen(true)}
          className="p-2 bg-pink-50/50 hover:bg-pink-100 text-pink-500 rounded-full transition-colors focus:outline-none"
        >
          <History size={20} />
        </button>
      </div>

      {/* Display */}
      <div className="p-6 pt-4 pb-8 flex flex-col items-end gap-2 relative z-10">
        <div className="text-pink-400/80 h-6 font-mono text-sm tracking-wider">{equationString}</div>
        <div 
          className="text-6xl font-light text-pink-950 tracking-tight w-full text-right overflow-hidden text-ellipsis whitespace-nowrap"
          title={displayValue}
        >
          {displayValue}
        </div>
      </div>

      {/* Keypad */}
      <div className="relative z-10">
        <Keypad
          onNumber={handleNumber}
          onOperator={handleOperator}
          onEqual={handleEqual}
          onClear={handleClear}
          onDelete={handleDelete}
          onDecimal={handleDecimal}
        />
      </div>

      <HistoryPanel 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        history={history}
        onClear={() => setHistory([])}
        onSelect={handleHistorySelect}
      />
    </motion.div>
  );
}
