import React, { useState, useRef, useEffect } from 'react';

interface InputAnswerProps {
    onSubmit: (answer: number) => void;
    disabled: boolean;
    isCorrect: boolean;
    isIncorrect: boolean;
}

const InputAnswer: React.FC<InputAnswerProps> = ({ onSubmit, disabled, isCorrect, isIncorrect }) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!disabled) {
            inputRef.current?.focus();
            setValue('');
        }
    }, [disabled]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue)) {
            onSubmit(numValue);
        }
    };

    const getBorderColor = () => {
        if (isCorrect) return 'border-green-500';
        if (isIncorrect) return 'border-red-500';
        return 'border-white/30';
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm flex flex-col items-center gap-4">
            <input
                ref={inputRef}
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                className={`w-full text-center text-5xl font-bold bg-white/20 p-4 rounded-xl shadow-inner border-4 transition-colors duration-300 ${getBorderColor()} text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 disabled:opacity-70`}
                placeholder="?"
            />
            <button
                type="submit"
                disabled={disabled || value === ''}
                className="w-full px-8 py-4 bg-yellow-400 text-slate-800 font-bold text-2xl rounded-xl shadow-lg border-b-8 border-yellow-600 hover:bg-yellow-300 active:bg-yellow-500 active:border-b-4 active:translate-y-1 transform transition-all duration-150 ease-in-out hover:scale-105 disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed disabled:scale-100"
            >
                Controleer
            </button>
        </form>
    );
};

export default InputAnswer;
