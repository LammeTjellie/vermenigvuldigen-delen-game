import React, { useState, useEffect } from 'react';

interface NumberPadInputProps {
    onSubmit: (answer: number) => void;
    disabled: boolean;
    isCorrect: boolean;
    isIncorrect: boolean;
}

const NumberPadInput: React.FC<NumberPadInputProps> = ({ onSubmit, disabled, isCorrect, isIncorrect }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        // When a new question is presented (component is re-enabled), clear the previous value.
        if (!disabled) {
            setValue('');
        }
    }, [disabled]);


    const handleNumberClick = (num: number) => {
        if (disabled) return;
        if (value.length < 4) {
            setValue(prev => prev + num.toString());
        }
    };

    const handleBackspace = () => {
        if (disabled) return;
        setValue(prev => prev.slice(0, -1));
    };
    
    const handleClear = () => {
        if (disabled) return;
        setValue('');
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue)) {
            onSubmit(numValue);
        }
    };

    const getDisplayClasses = () => {
        let baseClasses = 'w-full text-center text-3xl font-bold p-2 rounded-xl shadow-inner border-4 transition-all duration-300 h-[60px] flex items-center justify-center';
        
        if (isCorrect) {
            return `${baseClasses} bg-green-500 text-white border-green-700`;
        }
        if (isIncorrect) {
            return `${baseClasses} bg-red-500 text-white border-red-700`;
        }
        return `${baseClasses} bg-white/10 text-white border-white/30`;
    };

    const numberButtons = [7, 8, 9, 4, 5, 6, 1, 2, 3];

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center gap-1">
            {/* Display */}
            <div className={getDisplayClasses()}>
                <span className="truncate">{value || '?'}</span>
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-1 w-full">
                {numberButtons.map(num => (
                    <button
                        type="button"
                        key={num}
                        onClick={() => handleNumberClick(num)}
                        disabled={disabled}
                        className="py-2 text-xl font-bold rounded-xl shadow-lg transform transition-all duration-150 ease-in-out bg-white text-indigo-600 border-b-8 border-gray-300 hover:bg-gray-100 active:bg-gray-200 active:border-b-4 active:translate-y-1 disabled:bg-gray-400/80 disabled:border-gray-500/80 disabled:text-gray-600 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {num}
                    </button>
                ))}
                 <button
                    type="button"
                    onClick={handleClear}
                    disabled={disabled || value === ''}
                    className="py-2 text-xl font-bold rounded-xl shadow-lg transform transition-all duration-150 ease-in-out bg-white/50 text-white border-b-8 border-gray-400/50 hover:bg-white/70 active:bg-gray-200 active:border-b-4 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    C
                 </button>
                 <button
                    type="button"
                    onClick={() => handleNumberClick(0)}
                    disabled={disabled}
                    className="py-2 text-xl font-bold rounded-xl shadow-lg transform transition-all duration-150 ease-in-out bg-white text-indigo-600 border-b-8 border-gray-300 hover:bg-gray-100 active:bg-gray-200 active:border-b-4 active:translate-y-1 disabled:bg-gray-400/80 disabled:border-gray-500/80 disabled:text-gray-600 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                    0
                 </button>
                 <button
                    type="button"
                    onClick={handleBackspace}
                    disabled={disabled || value === ''}
                    className="py-2 text-xl font-bold rounded-xl shadow-lg transform transition-all duration-150 ease-in-out bg-white/50 text-white border-b-8 border-gray-400/50 hover:bg-white/70 active:bg-gray-200 active:border-b-4 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    ⌫
                 </button>
            </div>
            
            {/* Submit Button */}
            <button
                type="submit"
                disabled={disabled || value === ''}
                className="w-full mt-1 px-8 py-2 bg-yellow-400 text-slate-800 font-bold text-lg rounded-xl shadow-lg border-b-8 border-yellow-600 hover:bg-yellow-300 active:bg-yellow-500 active:border-b-4 active:translate-y-1 transform transition-all duration-150 ease-in-out hover:scale-105 disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed disabled:scale-100"
            >
                Controleer
            </button>
        </form>
    );
};

export default NumberPadInput;