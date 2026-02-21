import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';

interface SliderProps {
    value: number;
    min: number;
    max: number;
    onChange: (val: number) => void;
    labels?: string[];
}

export const CustomSlider = ({ value, min, max, onChange, labels }: SliderProps) => {
    return (
        <div className="w-full relative py-4">
            <RadixSlider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={[value]}
                onValueChange={(vals) => onChange(vals[0])}
                max={max}
                min={min}
                step={1}
            >
                <RadixSlider.Track className="bg-slate-200 relative grow rounded-full h-[4px] overflow-hidden">
                    <RadixSlider.Range className="absolute bg-indigo-500 h-full" />
                </RadixSlider.Track>
                <RadixSlider.Thumb
                    className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-shadow transition-colors cursor-grab active:cursor-grabbing"
                    aria-label="Value"
                />
            </RadixSlider.Root>
            {labels && (
                <div className="flex justify-between w-full text-xs text-slate-500 mt-2 absolute top-full">
                    {labels.map((l, i) => <span key={i}>{l}</span>)}
                </div>
            )}
        </div>
    );
};
