import React, { useState } from 'react';
import { UserInfo, FormData, ReportData } from './types';
import { IntroStep } from './components/IntroStep';
import { FormStep } from './components/FormStep';
import { ReportStep } from './components/ReportStep';
import { generateAIReport } from './services/geminiService';
import { School } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'form' | 'report'>('intro');
  
  const [formData, setFormData] = useState<FormData>({
    userInfo: { name: '', date: '' },
    competencies: {},
    textAnswers: {}
  });

  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStart = (info: UserInfo) => {
    setFormData(prev => ({ ...prev, userInfo: info }));
    setStep('form');
    window.scrollTo(0, 0);
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    try {
      const report = await generateAIReport(formData);
      setReportData(report);
      setStep('report');
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Erro ao gerar relatório. Por favor, tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      
      {/* Global Header */}
      <header className="bg-diocesan-blue text-white shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-white/10 p-2 rounded-lg">
                <School className="w-6 h-6 text-diocesan-gold" />
             </div>
             <div>
                <h1 className="font-serif font-bold tracking-wide">CEC - CENTRO DE EDUCAÇÃO E CULTURA</h1>
                <p className="text-[10px] uppercase tracking-widest text-white/70">Educação Básica</p>
             </div>
          </div>
          {step !== 'intro' && (
            <div className="text-sm font-medium hidden sm:block opacity-90">
               {formData.userInfo.name}
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow">
        {step === 'intro' && <IntroStep onStart={handleStart} />}
        {step === 'form' && (
          <FormStep 
            formData={formData} 
            setFormData={setFormData}
            onSubmit={handleSubmitForm} 
            isSubmitting={isSubmitting} 
          />
        )}
        {step === 'report' && reportData && (
          <ReportStep data={formData} report={reportData} />
        )}
      </main>

    </div>
  );
};

export default App;