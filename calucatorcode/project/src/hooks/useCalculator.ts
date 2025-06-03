import { useState, useCallback } from 'react';
import * as math from 'mathjs';

type HistoryItem = {
  formula: string;
  result: string;
};

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [memory, setMemory] = useState<string | null>(null);
  
  // Helper function to format results
  const formatResult = (result: number): string => {
    // Handle scientific notation for very large/small numbers
    if (result > 1e10 || (result < 1e-10 && result !== 0)) {
      return result.toExponential(6);
    }
    
    // Format to a reasonable number of decimal places
    const resultStr = result.toString();
    
    if (resultStr.includes('.')) {
      // Limit decimal places but remove trailing zeros
      return parseFloat(result.toFixed(10)).toString();
    }
    
    return resultStr;
  };

  // Function to handle mathematical operations
  const calculateResult = (input: string): string => {
    try {
      // Replace ^ with ** for exponentiation
      const processedInput = input.replace(/\^/g, '**');
      
      // Evaluate the expression
      const result = math.evaluate(processedInput);
      
      // Format the result
      return formatResult(result);
    } catch (error) {
      console.error('Calculation error:', error);
      return 'Error';
    }
  };
  
  // Function to handle advanced mathematical functions
  const handleFunction = (funcName: string) => {
    try {
      let result: string;
      
      switch (funcName) {
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'sqrt':
          result = calculateResult(`${funcName}(${display})`);
          setFormula(`${funcName}(${display})`);
          break;
        case 'ln':
          result = calculateResult(`log(${display}, e)`);
          setFormula(`ln(${display})`);
          break;
        case '!':
          result = calculateResult(`factorial(${display})`);
          setFormula(`${display}!`);
          break;
        default:
          return;
      }
      
      setDisplay(result);
      setWaitingForOperand(true);
      
      // Add to history
      setHistory(prev => [
        { formula: formula || display, result },
        ...prev.slice(0, 9) // Keep last 10 items
      ]);
      
    } catch (error) {
      setDisplay('Error');
      console.error('Function error:', error);
    }
  };
  
  // Function to handle memory operations
  const handleMemory = () => {
    if (!memory) {
      // Store current value in memory
      setMemory(display);
    } else {
      // Recall value from memory and replace current display
      setDisplay(memory);
      setMemory(null);
    }
  };
  
  // Function to handle button presses
  const handleButtonPress = useCallback((value: string) => {
    // Add animation effect particles (would be implemented with a particle system)
    const createRippleEffect = () => {
      // This would create a visual ripple effect
      // Implementation details omitted for brevity
    };
    
    createRippleEffect();
    
    switch (value) {
      case 'clear':
        setDisplay('0');
        setFormula('');
        setWaitingForOperand(false);
        break;
        
      case '=':
        if (formula) {
          try {
            const fullFormula = `${formula}${formula.endsWith(display) ? '' : display}`;
            const result = calculateResult(fullFormula);
            
            // Add to history
            setHistory(prev => [
              { formula: fullFormula, result },
              ...prev.slice(0, 9) // Keep last 10 items
            ]);
            
            setDisplay(result);
            setFormula('');
            setWaitingForOperand(true);
          } catch (error) {
            setDisplay('Error');
            console.error('Calculation error:', error);
          }
        }
        break;
        
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
        // Handle operators
        const newFormula = waitingForOperand 
          ? formula.slice(0, -1) + value // Replace last operator
          : (formula + display + value); // Append display and operator
        
        setFormula(newFormula);
        setWaitingForOperand(true);
        break;
        
      case '%':
        // Calculate percentage
        try {
          const percentValue = parseFloat(display) / 100;
          setDisplay(formatResult(percentValue));
          setFormula(`${display}% = `);
          setWaitingForOperand(true);
        } catch (error) {
          setDisplay('Error');
        }
        break;
        
      case 'memory':
        handleMemory();
        break;
        
      case '.':
        // Add decimal point if not already present
        if (!display.includes('.')) {
          setDisplay(display + '.');
          setWaitingForOperand(false);
        }
        break;
        
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
      case 'sqrt':
      case '!':
        handleFunction(value);
        break;
        
      default:
        // Handle numbers
        if (waitingForOperand || display === '0') {
          setDisplay(value);
          setWaitingForOperand(false);
        } else {
          setDisplay(display + value);
        }
        break;
    }
  }, [display, formula, waitingForOperand, memory]);
  
  // Function to clear history
  const clearHistory = () => {
    setHistory([]);
  };
  
  // Function to handle keyboard input
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    
    // Prevent default for calculator keys to avoid unwanted browser actions
    if (
      /[\d+\-*/.=]/.test(key) || 
      key === 'Enter' || 
      key === 'Escape' || 
      key === 'Backspace'
    ) {
      event.preventDefault();
    }
    
    // Map keyboard keys to calculator buttons
    switch (key) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
      case '+':
      case '-':
      case '*':
      case '/':
        handleButtonPress(key);
        break;
      case 'Enter':
      case '=':
        handleButtonPress('=');
        break;
      case 'Escape':
        handleButtonPress('clear');
        break;
      case '^':
        handleButtonPress('^');
        break;
      case '%':
        handleButtonPress('%');
        break;
      case 'Backspace':
        // Handle backspace to delete last digit
        if (display !== '0' && !waitingForOperand) {
          setDisplay(display.length === 1 ? '0' : display.slice(0, -1));
        }
        break;
    }
  }, [handleButtonPress, display, waitingForOperand]);
  
  return {
    display,
    formula,
    history,
    memory,
    handleButtonPress,
    handleKeyDown,
    clearHistory,
  };
};