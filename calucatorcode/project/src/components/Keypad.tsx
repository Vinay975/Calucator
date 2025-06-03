import React from 'react';
import Button from './Button';
import { 
  Divide, X, Minus, Plus, Equal, Trash2, 
  RotateCcw, Percent, Save, CornerDownLeft
} from 'lucide-react';

interface KeypadProps {
  onButtonPress: (value: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onButtonPress }) => {
  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {/* Row 1 - Clear, Memory, Percentage, Divide */}
      <Button 
        value="clear" 
        onClick={() => onButtonPress('clear')} 
        variant="secondary"
      >
        <Trash2 size={18} />
      </Button>
      <Button 
        value="memory" 
        onClick={() => onButtonPress('memory')} 
        variant="secondary"
      >
        <Save size={18} />
      </Button>
      <Button 
        value="%" 
        onClick={() => onButtonPress('%')} 
        variant="secondary"
      >
        <Percent size={18} />
      </Button>
      <Button 
        value="/" 
        onClick={() => onButtonPress('/')} 
        variant="operation"
      >
        <Divide size={18} />
      </Button>

      {/* Row 2 - 7, 8, 9, Multiply */}
      <Button value="7" onClick={() => onButtonPress('7')}>7</Button>
      <Button value="8" onClick={() => onButtonPress('8')}>8</Button>
      <Button value="9" onClick={() => onButtonPress('9')}>9</Button>
      <Button 
        value="*" 
        onClick={() => onButtonPress('*')} 
        variant="operation"
      >
        <X size={18} />
      </Button>

      {/* Row 3 - 4, 5, 6, Subtract */}
      <Button value="4" onClick={() => onButtonPress('4')}>4</Button>
      <Button value="5" onClick={() => onButtonPress('5')}>5</Button>
      <Button value="6" onClick={() => onButtonPress('6')}>6</Button>
      <Button 
        value="-" 
        onClick={() => onButtonPress('-')} 
        variant="operation"
      >
        <Minus size={18} />
      </Button>

      {/* Row 4 - 1, 2, 3, Add */}
      <Button value="1" onClick={() => onButtonPress('1')}>1</Button>
      <Button value="2" onClick={() => onButtonPress('2')}>2</Button>
      <Button value="3" onClick={() => onButtonPress('3')}>3</Button>
      <Button 
        value="+" 
        onClick={() => onButtonPress('+')} 
        variant="operation"
      >
        <Plus size={18} />
      </Button>

      {/* Row 5 - 0, ., =, Backspace */}
      <Button 
        value="0" 
        onClick={() => onButtonPress('0')} 
        className="col-span-2"
      >
        0
      </Button>
      <Button value="." onClick={() => onButtonPress('.')}>.</Button>
      <Button 
        value="=" 
        onClick={() => onButtonPress('=')} 
        variant="primary"
      >
        <Equal size={18} />
      </Button>

      {/* Row 6 - Advanced functions */}
      <Button value="sin" onClick={() => onButtonPress('sin')} variant="advanced">sin</Button>
      <Button value="cos" onClick={() => onButtonPress('cos')} variant="advanced">cos</Button>
      <Button value="tan" onClick={() => onButtonPress('tan')} variant="advanced">tan</Button>
      <Button value="sqrt" onClick={() => onButtonPress('sqrt')} variant="advanced">√</Button>

      {/* Row 7 - More advanced functions */}
      <Button value="log" onClick={() => onButtonPress('log')} variant="advanced">log</Button>
      <Button value="ln" onClick={() => onButtonPress('ln')} variant="advanced">ln</Button>
      <Button value="^" onClick={() => onButtonPress('^')} variant="advanced">x^y</Button>
      <Button value="!" onClick={() => onButtonPress('!')} variant="advanced">x!</Button>
    </div>
  );
};

export default Keypad;