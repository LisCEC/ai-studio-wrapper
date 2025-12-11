import React, { useState, useEffect } from 'react';
import { FormData, Section } from '../types';
import { SECTIONS } from '../constants';
import { RatingScale } from './RatingScale';
import { ArrowRight, ArrowLeft, CheckCircle, HelpCircle, AlertCircle, MessageSquare, Star } from 'lucide-react';

interface FormStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const FormStep: React.FC<FormStepProps> = ({ formData, setFormData, onSubmit, isSubmitting }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentSection = SECTIONS[currentSectionIndex];

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSectionIndex]);

  const handleRatingChange = (sectionId: string, rating: number) => {
    setFormData(prev => {
      const existing = prev.competencies[sectionId] || { rating: 0, reflection: '' };
      return {
        ...prev,
        competencies: {
          ...prev.competencies,
          [sectionId]: {
            ...existing,
            rating
          }
        }
      };
    });
  };

  const handleReflectionChange = (sectionId: string, reflection: string) => {
    setFormData(prev => {
      const existing = prev.competencies[sectionId] || { rating: 0, reflection: '' };
      return {
        ...prev,
        competencies: {
          ...prev.competencies,
          [sectionId]: {
            ...existing,
            reflection
          }
        }
      };
    });
  };

  const handleTextAnswerChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      textAnswers: {
        ...prev.textAnswers,
        [fieldId]: value
      }
    }));
  };

  const validateSection = (section: Section): { isValid: boolean; message?: string } => {
    if (section.type === 'COMPETENCY') {
      const comp = formData.competencies[section.id];
      if (!comp || comp.rating === 0) {
        return { isValid: false, message: "Selecione uma nota de avaliação (1-10)" };
      }
      if ((comp.reflection || '').trim().length < 10) {
        return { isValid: false, message: "A justificativa deve ter pelo menos 10 caracteres" };
      }
      return { isValid: true };
    }
    
    if (section.type === 'OPEN_TEXT' || section.type === 'DEVELOPMENT') {
      const allFilled = section.fields?.every(f => !!formData.textAnswers[f.id]?.trim());
      if (!allFilled) {
        return { isValid: false, message: "Preencha todos os campos abertos" };
      }
      return { isValid: true };
    }
    
    return { isValid: true };
  };

  const handleNext = () => {
    const { isValid } = validateSection(currentSection);
    if (!isValid) return;

    if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    } else {
      onSubmit();
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const progress = Math.round(((currentSectionIndex) / SECTIONS.length) * 100);
  const validation = validateSection(currentSection);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Seção {currentSection.number} de {SECTIONS.length + 1}</span>
          <span>{progress}% Concluído</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-diocesan-gold transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card - Added key to force re-render on section change */}
      <div key={currentSection.id} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-h-[500px] flex flex-col animate-fade-in">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <span className="text-diocesan-gold font-bold tracking-wider text-xs uppercase mb-2 block">
            {currentSection.number}. {currentSection.type === 'COMPETENCY' ? 'Competência' : 'Reflexão'}
          </span>
          <h2 className="text-2xl font-serif font-bold text-diocesan-blue mb-2">
            {currentSection.title}
          </h2>
          {currentSection.description && (
            <p className="text-slate-600">{currentSection.description}</p>
          )}
        </div>

        <div className="p-8 flex-1">
          {currentSection.type === 'COMPETENCY' && (
            <div className="space-y-8">
              {/* Rating */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <div className="flex items-center gap-2 mb-4">
                    <Star className="text-diocesan-gold w-5 h-5" />
                    <h3 className="font-bold text-slate-700">Autoavaliação</h3>
                 </div>
                <RatingScale 
                  value={formData.competencies[currentSection.id]?.rating || 0}
                  onChange={(val) => handleRatingChange(currentSection.id, val)}
                />
              </div>

              {/* Guiding Questions Box */}
              <div className="flex gap-4 p-4 bg-blue-50 text-blue-900 rounded-lg text-sm">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-diocesan-blue mt-0.5" />
                <div className="space-y-2">
                  <p className="font-bold">Perguntas Norteadoras:</p>
                  <ul className="list-disc pl-4 space-y-1 opacity-90">
                    {currentSection.guidingQuestions?.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reflection Input */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <MessageSquare size={16} />
                  Sua Reflexão (Responda em formato de texto corrido)
                </label>
                <textarea
                  className="w-full p-4 rounded-xl border border-slate-300 focus:border-diocesan-blue focus:ring-2 focus:ring-diocesan-blue/20 outline-none min-h-[200px] transition-all text-slate-700"
                  placeholder="Escreva aqui sua análise detalhada baseada nas perguntas acima..."
                  value={formData.competencies[currentSection.id]?.reflection || ''}
                  onChange={(e) => handleReflectionChange(currentSection.id, e.target.value)}
                />
                <div className="mt-2 text-xs text-slate-400 flex justify-between">
                  <span className={validation.message?.includes('caracteres') ? "text-red-500 font-bold" : ""}>
                     Mínimo de 10 caracteres
                  </span>
                  <span>{(formData.competencies[currentSection.id]?.reflection || '').length} caracteres</span>
                </div>
              </div>
            </div>
          )}

          {(currentSection.type === 'OPEN_TEXT' || currentSection.type === 'DEVELOPMENT') && (
            <div className="space-y-6">
               <div className="grid gap-6">
                 {currentSection.fields?.map(field => (
                   <div key={field.id}>
                     <label className="block text-sm font-bold text-slate-700 mb-2">
                       {field.label}
                     </label>
                     {field.inputType === 'number' ? (
                        <div className="relative max-w-xs">
                          <input
                            type="number"
                            className="w-full p-3 rounded-lg border border-slate-300 focus:border-diocesan-blue outline-none"
                            placeholder={field.placeholder}
                            value={formData.textAnswers[field.id] || ''}
                            onChange={(e) => handleTextAnswerChange(field.id, e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-slate-400 text-sm">horas</span>
                        </div>
                     ) : (
                       <textarea
                         className="w-full p-3 rounded-lg border border-slate-300 focus:border-diocesan-blue outline-none min-h-[100px]"
                         placeholder={field.placeholder}
                         value={formData.textAnswers[field.id] || ''}
                         onChange={(e) => handleTextAnswerChange(field.id, e.target.value)}
                       />
                     )}
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentSectionIndex === 0}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors order-2 md:order-1
              ${currentSectionIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-200'}
            `}
          >
            <ArrowLeft size={18} /> Anterior
          </button>

          <div className="flex flex-col items-end gap-2 order-1 md:order-2 w-full md:w-auto">
            <button
              onClick={handleNext}
              disabled={!validation.isValid || isSubmitting}
              className={`
                w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all
                ${!validation.isValid || isSubmitting
                   ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                   : 'bg-diocesan-blue hover:bg-blue-800 hover:shadow-xl hover:-translate-y-0.5'}
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  Processando...
                </span>
              ) : (
                currentSectionIndex === SECTIONS.length - 1 ? (
                  <>Finalizar Relatório <CheckCircle size={18} /></>
                ) : (
                  <>Próximo <ArrowRight size={18} /></>
                )
              )}
            </button>
            {!validation.isValid && validation.message && (
              <span className="text-xs text-red-500 font-bold flex items-center gap-1 bg-red-50 px-2 py-1 rounded">
                 <AlertCircle size={12} /> {validation.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};