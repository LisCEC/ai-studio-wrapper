
import React from 'react';

interface RatingScaleProps {
  value: number;
  onChange: (val: number) => void;
}

export const RatingScale: React.FC<RatingScaleProps> = ({ value, onChange }) => {
  const getLabel = (val: number) => {
    if (val === 0) return "Selecione uma nota";
    if (val <= 3) return "Precisa Melhorar";
    if (val <= 6) return "Em Desenvolvimento";
    if (val <= 8) return "Bom / Adequado";
    return "Excelente / Referência";
  };

  const getColor = (val: number) => {
    if (val <= 3) return "bg-red-500 text-white border-red-600";
    if (val <= 6) return "bg-orange-400 text-white border-orange-500";
    if (val <= 8) return "bg-blue-500 text-white border-blue-600";
    return "bg-green-600 text-white border-green-700";
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-end mb-1">
         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avaliação (1 a 10)</span>
         {value > 0 && (
           <span className={`text-xs font-bold px-3 py-1 rounded-full animate-fade-in ${getColor(value)}`}>
             {getLabel(value)}
           </span>
         )}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-between">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => {
          const isSelected = value === rating;
          let baseColor = "bg-white text-slate-500 border-slate-200 hover:border-diocesan-gold";
          
          if (isSelected) {
            baseColor = getColor(rating) + " shadow-md transform scale-110 ring-2 ring-offset-2 ring-slate-100";
          } else if (value > 0 && rating < value) {
             baseColor = "bg-slate-50 text-slate-300 border-slate-100"; // dim previous
          }

          return (
            <button
              key={rating}
              onClick={() => onChange(rating)}
              className={`
                flex-1 min-w-[36px] h-12 rounded-lg border transition-all duration-200 font-bold text-lg
                ${baseColor}
              `}
              type="button"
            >
              {rating}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-widest px-1">
        <span>Insuficiente</span>
        <span>Excepcional</span>
      </div>
    </div>
  );
};
