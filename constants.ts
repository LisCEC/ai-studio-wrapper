import { Section } from './types';

export const INTRO_TITLE = "Autoavaliação 2025";
export const INTRO_SUBTITLE = "Auxiliares Administrativos - CEC - Centro de Educação e Cultura";
export const INTRO_TEXT = `Este formulário tem como objetivo principal promover a reflexão individual sobre o seu desempenho. Através desta autoavaliação, buscamos identificar pontos fortes, reconhecer sucessos e, principalmente, mapear áreas para desenvolvimento e crescimento profissional. Responda com honestidade e riqueza de detalhes.`;

export const SECTIONS: Section[] = [
  {
    id: 'sec_discipline',
    number: 2,
    type: 'COMPETENCY',
    title: 'Disciplina e Supervisão Diária',
    description: 'Este setor abrange tarefas como disciplinar a entrada de alunos (atrasos, uniformes, calçados), monitorar recreios e suporte nas saídas de alunos, essenciais para manter a ordem e a segurança no ambiente escolar.',
    guidingQuestions: [
      'Quais conquistas específicas realizei na supervisão diária (redução de atrasos, incidentes)?',
      'Quais desafios enfrentei (resistência de alunos, fluxo) e estratégias que apliquei?',
      'Quais aprendizados obtive sobre padrões comportamentais dos alunos?',
      'Quais próximos passos planejo para aprimorar a eficiência (ex: checklists)?',
      'Como avalio a eficácia das minhas ações de disciplina (tempo vs resultado)?'
    ]
  },
  {
    id: 'sec_presence',
    number: 3,
    type: 'COMPETENCY',
    title: 'Gestão de Presença e Agendamentos',
    description: 'Aqui, concentram-se tarefas como verificar presença de professores nas turmas e horários, e agendar alunos para saúde mental e coordenadores.',
    guidingQuestions: [
      'Qual progresso demonstrei na verificação de presenças e agendamentos?',
      'Quais obstáculos surgiram (sistemas, conflitos) e o que aprendi sobre priorização?',
      'Como julgo a eficiência das minhas práticas de gestão de presença e precisão dos registros?'
    ]
  },
  {
    id: 'sec_resources',
    number: 4,
    type: 'COMPETENCY',
    title: 'Controle de Recursos e Estoque',
    description: 'Envolve entrega e controle de estoque de materiais no almoxarifado, chaves das salas, empréstimos de utensílios da cantina e toalhas.',
    guidingQuestions: [
      'Quais conquistas destaquei no controle de estoque e entregas?',
      'Quais desafios operacionais (perdas, demandas inesperadas) enfrentei?',
      'Quais aprendizados emergiram sobre o uso eficiente de recursos?',
      'De que modo avalio a eficácia das minhas ações de controle de recursos?'
    ]
  },
  {
    id: 'sec_support',
    number: 5,
    type: 'COMPETENCY',
    title: 'Suporte Pedagógico e Logístico',
    description: 'Focado em auxiliar a coordenação pedagógica, suporte na aplicação de provas, organização de salas para reuniões/eventos e distribuição de móveis.',
    guidingQuestions: [
      'Quais progressos realizei no suporte pedagógico e logístico?',
      'Quais obstáculos ou limitações espaciais identifiquei?',
      'Quais insights obtive sobre as necessidades logísticas?',
      'Como avalio a eficiência do meu suporte logístico?'
    ]
  },
  {
    id: 'sec_care',
    number: 6,
    type: 'COMPETENCY',
    title: 'Cuidados com Alunos e Relacionamento com Pais',
    description: 'Inclui primeiros socorros aos alunos, contato com pais sobre integridade física e saúde, e entrega de cartões aos aniversariantes.',
    guidingQuestions: [
      'Quais conquistas pessoais destaquei nos cuidados com alunos?',
      'Quais desafios na comunicação com pais enfrentei e estratégias de empatia apliquei?',
      'Quais aprendizados chave emergiram sobre as necessidades emocionais/físicas?',
      'De que forma julgo a eficácia das minhas ações de cuidado e resolução?'
    ]
  },
  {
    id: 'sec_challenges',
    number: 7,
    type: 'OPEN_TEXT',
    title: 'Desafios e Conquistas',
    description: 'Reflexão sobre os momentos marcantes do ciclo de 2025.',
    fields: [
      { id: 'difficulty_2025', label: 'Maior dificuldade enfrentada em 2025', placeholder: 'Descreva o maior desafio e como tentou superá-lo.' },
      { id: 'achievement_2025', label: 'Maior conquista/momento de êxito', placeholder: 'Compartilhe um momento de grande sucesso na sua prática.' },
      { id: 'learning_2025', label: 'Aprendizado pessoal mais significativo', placeholder: 'O que você aprendeu sobre si mesmo(a)?' },
      { id: 'change_2026', label: 'O que precisa mudar em 2026?', placeholder: 'O que você priorizaria para melhorar em sua prática?' }
    ]
  },
  {
    id: 'sec_dev',
    number: 8,
    type: 'DEVELOPMENT',
    title: 'Desenvolvimento Profissional',
    description: 'Planejamento de capacitação e formação.',
    fields: [
      { id: 'training_received', label: 'Formação recebida em 2025', placeholder: 'Liste as formações e capacitações que participou.' },
      { id: 'training_desired', label: 'Formação desejada para 2026', placeholder: 'Quais temas seriam mais relevantes para você?' },
      { id: 'training_hours', label: 'Tempo disponível (Horas/mês)', placeholder: 'Ex: 4', inputType: 'number' }
    ]
  }
];