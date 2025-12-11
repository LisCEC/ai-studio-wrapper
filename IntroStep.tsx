
import React, { useState } from 'react';
import { UserInfo } from '../types';
import { INTRO_TEXT, INTRO_TITLE, INTRO_SUBTITLE } from '../constants';
import { School, ArrowRight, User, Calendar } from 'lucide-react';

interface IntroStepProps {
  onStart: (info: UserInfo) => void;
}

export const IntroStep: React.FC<IntroStepProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart({ name, date });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-diocesan-blue">
        <div className="p-8 sm:p-12">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-20 h-20 bg-diocesan-light rounded-full flex items-center justify-center mb-4">
               <School className="w-10 h-10 text-diocesan-blue" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-diocesan-blue mb-2">
              {INTRO_TITLE}
            </h1>
            <h2 className="text-xl text-diocesan-gold font-medium">
              {INTRO_SUBTITLE}
            </h2>
          </div>

          <div className="prose prose-slate mx-auto mb-10 text-justify text-slate-600 leading-relaxed">
            <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-diocesan-blue first-letter:float-left first-letter:mr-2">
              {INTRO_TEXT}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Seção 1: Identificação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <User size={16} /> Nome Completo
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-diocesan-blue focus:border-diocesan-blue outline-none transition"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Data de Preenchimento
                </label>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-diocesan-blue focus:border-diocesan-blue outline-none transition"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={!name.trim()}
                className="group flex items-center gap-2 bg-diocesan-blue hover:bg-blue-800 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Iniciar Autoavaliação
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
