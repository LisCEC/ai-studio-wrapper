import React, { useRef } from 'react';
import { FormData, ReportData } from '../types';
import { SECTIONS } from '../constants';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Printer, User, Calendar, Award, Target, BookOpen, Quote } from 'lucide-react';

interface ReportStepProps {
  data: FormData;
  report: ReportData;
}

export const ReportStep: React.FC<ReportStepProps> = ({ data, report }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const competencies = SECTIONS.filter(s => s.type === 'COMPETENCY');
  
  const chartData = competencies.map(s => ({
    name: s.title.split(' ')[0] + '...', // Short name
    fullName: s.title,
    value: data.competencies[s.id]?.rating || 0
  }));

  const totalScore = competencies.reduce((acc, s) => acc + (data.competencies[s.id]?.rating || 0), 0);
  const averageScore = (totalScore / competencies.length).toFixed(1);

  const getSectionAnswer = (fieldId: string) => data.textAnswers[fieldId] || '-';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8 no-print">
         <h2 className="text-2xl font-serif font-bold text-slate-800">Seu Relatório</h2>
         <button 
           onClick={handlePrint}
           className="flex items-center gap-2 px-6 py-2 bg-diocesan-blue text-white rounded-lg hover:bg-blue-900 transition shadow-lg"
         >
           <Printer size={18} /> Imprimir Relatório
         </button>
      </div>

      <div ref={componentRef} className="bg-white shadow-2xl rounded-xl overflow-hidden print:shadow-none print:w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-diocesan-blue to-blue-900 text-white p-10 print:bg-slate-900 print:text-black">
          <div className="flex justify-between items-start">
             <div>
               <h1 className="text-4xl font-serif font-bold mb-2">Relatório de Desempenho</h1>
               <p className="opacity-80 text-lg">Auxiliares Administrativos • Ciclo 2025</p>
             </div>
             <div className="text-right bg-white/10 p-4 rounded-xl backdrop-blur-sm print:bg-transparent print:border print:border-slate-800">
               <div className="text-5xl font-bold text-diocesan-gold">{averageScore}</div>
               <div className="text-xs uppercase tracking-wider opacity-80 mt-1">Média Geral (1-10)</div>
             </div>
          </div>
          <div className="mt-8 flex gap-12 text-sm opacity-90 border-t border-white/20 pt-6">
             <div className="flex items-center gap-3">
               <User className="w-5 h-5 text-diocesan-gold" />
               <div>
                 <span className="block opacity-60 text-xs uppercase">Colaborador</span>
                 <span className="font-semibold text-lg">{data.userInfo.name}</span>
               </div>
             </div>
             <div className="flex items-center gap-3">
               <Calendar className="w-5 h-5 text-diocesan-gold" />
               <div>
                 <span className="block opacity-60 text-xs uppercase">Data</span>
                 <span className="font-semibold text-lg">{new Date(data.userInfo.date).toLocaleDateString()}</span>
               </div>
             </div>
          </div>
        </div>

        <div className="p-10 space-y-10">
          
          {/* AI Summary */}
          <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100 page-break">
            <h3 className="text-xl font-bold text-diocesan-blue mb-4 flex items-center gap-2">
              <Award className="text-diocesan-gold" /> Feedback Executivo
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg font-serif italic">
              "{report.summary}"
            </p>
          </section>

          {/* Metrics */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">Indicadores de Competência</h3>
            <div className="h-[300px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis domain={[0, 10]} tickCount={11} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white p-3 shadow-xl rounded border border-slate-100">
                            <p className="font-bold text-diocesan-blue text-sm">{d.fullName}</p>
                            <p className="font-bold text-xl mt-1">Nota: {d.value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value >= 8 ? '#1e3a8a' : entry.value >= 6 ? '#d97706' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 page-break">
            <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
               <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                 <Award size={20} /> Pontos Fortes
               </h3>
               <ul className="space-y-2">
                 {report.strengths.map((s, i) => (
                   <li key={i} className="flex gap-2 text-slate-700 text-sm">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                     {s}
                   </li>
                 ))}
               </ul>
            </div>
            <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100">
               <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                 <Target size={20} /> Pontos de Melhoria
               </h3>
               <ul className="space-y-2">
                 {report.improvements.map((s, i) => (
                   <li key={i} className="flex gap-2 text-slate-700 text-sm">
                     <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                     {s}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Development Plan */}
          <section className="bg-slate-800 text-white p-6 rounded-xl page-break">
            <h3 className="font-bold text-diocesan-gold mb-3 flex items-center gap-2">
               <BookOpen size={20} /> Plano de Desenvolvimento Recomendado
            </h3>
            <p className="text-slate-200 leading-relaxed text-sm">
              {report.developmentPlan}
            </p>
          </section>

          {/* Qualitative Data Summary Table */}
          <section className="page-break">
            <h3 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">Detalhamento das Reflexões</h3>
            <div className="space-y-8">
              {competencies.map(section => (
                <div key={section.id} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-baseline mb-3">
                    <h4 className="font-bold text-diocesan-blue">{section.title}</h4>
                    <span className="font-bold bg-white px-3 py-1 rounded-full border border-slate-200 text-sm">
                      Nota: {data.competencies[section.id]?.rating}/10
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Quote className="w-5 h-5 text-slate-300 flex-shrink-0 transform rotate-180" />
                    <p className="text-slate-600 text-sm italic leading-relaxed">
                      {data.competencies[section.id]?.reflection}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges & Dev Data */}
          <section className="page-break">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                 <h3 className="font-bold text-slate-800 mb-4">Desafios e Conquistas</h3>
                 <dl className="space-y-4">
                   <div className="bg-slate-50 p-4 rounded-lg">
                     <dt className="text-xs font-bold text-slate-500 uppercase mb-1">Maior Dificuldade</dt>
                     <dd className="text-slate-800 text-sm">{getSectionAnswer('difficulty_2025')}</dd>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-lg">
                     <dt className="text-xs font-bold text-slate-500 uppercase mb-1">Maior Conquista</dt>
                     <dd className="text-slate-800 text-sm">{getSectionAnswer('achievement_2025')}</dd>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-lg">
                     <dt className="text-xs font-bold text-slate-500 uppercase mb-1">Aprendizado</dt>
                     <dd className="text-slate-800 text-sm">{getSectionAnswer('learning_2025')}</dd>
                   </div>
                 </dl>
               </div>
               <div>
                 <h3 className="font-bold text-slate-800 mb-4">Formação e Futuro</h3>
                 <dl className="space-y-4">
                   <div className="bg-slate-50 p-4 rounded-lg">
                     <dt className="text-xs font-bold text-slate-500 uppercase mb-1">Formação Realizada</dt>
                     <dd className="text-slate-800 text-sm">{getSectionAnswer('training_received')}</dd>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-lg">
                     <dt className="text-xs font-bold text-slate-500 uppercase mb-1">Desejo para 2026</dt>
                     <dd className="text-slate-800 text-sm">{getSectionAnswer('training_desired')}</dd>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-lg">
                     <dt className="text-xs font-bold text-slate-500 uppercase mb-1">Disponibilidade Mensal</dt>
                     <dd className="text-slate-800 text-sm">{getSectionAnswer('training_hours')} horas</dd>
                   </div>
                 </dl>
               </div>
             </div>
          </section>

          <div className="pt-8 mt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
            <p>Este documento é confidencial e para uso exclusivo da gestão do CEC - Centro de Educação e Cultura.</p>
          </div>
        </div>
      </div>
    </div>
  );
};