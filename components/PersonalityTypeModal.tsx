import React, { useState, useEffect } from 'react';
import { LearningProfile } from '../types';
import { PERSONALITY_INSIGHTS, PersonalityInsight } from './personalityData';
import { PERSONALITY_DEEP_DATA, PersonalityDeepInsight } from './personalityDeepData';
import { Icons } from './Icons';

interface PersonalityTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: LearningProfile | null;
  onSelectType: (profile: LearningProfile) => void;
  onClearProfile?: () => void;
  onRedoTest: () => void;
  uiLanguage: 'EN' | 'RU';
  isRenoir: boolean;
  onAskOracle?: (query: string) => void;
}

export const PersonalityTypeModal: React.FC<PersonalityTypeModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSelectType,
  onClearProfile,
  onRedoTest,
  uiLanguage,
  isRenoir,
  onAskOracle
}) => {
  const initialType = currentProfile?.type || 'INTJ';
  const [inspectedType, setInspectedType] = useState<string>(initialType);
  const [appliedNotification, setAppliedNotification] = useState(false);
  const [clearedNotification, setClearedNotification] = useState(false);
  const [customOracleQuestion, setCustomOracleQuestion] = useState('');

  useEffect(() => {
    if (currentProfile?.type) {
      setInspectedType(currentProfile.type);
    }
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const data: PersonalityInsight = PERSONALITY_INSIGHTS[inspectedType] || PERSONALITY_INSIGHTS.INTJ;
  const deepData: PersonalityDeepInsight = PERSONALITY_DEEP_DATA[inspectedType] || PERSONALITY_DEEP_DATA.INTJ;
  const isEn = uiLanguage !== 'RU';
  const isActiveSelected = currentProfile?.type === inspectedType;

  const handleApply = () => {
    const newProfile: LearningProfile = {
      type: data.type,
      label: isEn ? data.title.en : data.title.ru,
      traits: {
        energy: data.type[0] as 'I' | 'E',
        information: data.type[1] as 'S' | 'N',
        decision: data.type[2] as 'T' | 'F',
        lifestyle: data.type[3] as 'J' | 'P'
      }
    };
    onSelectType(newProfile);
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 2500);
  };

  const handleClear = () => {
    if (onClearProfile) {
      onClearProfile();
      setClearedNotification(true);
      setTimeout(() => {
        setClearedNotification(false);
        onClose();
      }, 1000);
    }
  };

  const handlePrint = () => {
    const title = `${data.type} - ${isEn ? data.title.en : data.title.ru}`;
    const motto = isEn ? data.motto.en : data.motto.ru;
    const intro = isEn ? data.psychologistIntro.en : data.psychologistIntro.ru;
    const portrait = isEn ? data.deepPortrait.en : data.deepPortrait.ru;
    const learning = isEn ? data.learningStyle.en : data.learningStyle.ru;
    const workEnv = isEn ? deepData.careers.workEnvironment.en : deepData.careers.workEnvironment.ru;
    const careerGrowth = isEn ? deepData.careers.growthAdvice.en : deepData.careers.growthAdvice.ru;
    const commStyle = isEn ? deepData.relationships.communicationStyle.en : deepData.relationships.communicationStyle.ru;
    const intimacy = isEn ? deepData.relationships.intimacyAdvice.en : deepData.relationships.intimacyAdvice.ru;
    const existMotive = isEn ? deepData.philosophy.existentialMotive.en : deepData.philosophy.existentialMotive.ru;
    const philosophers = isEn ? deepData.philosophy.idealPhilosophers.en : deepData.philosophy.idealPhilosophers.ru;
    const oracleStrategy = isEn ? data.oracleAdvice.en : data.oracleAdvice.ru;

    const strengthsHtml = data.strengths.map(s => `
      <li style="margin-bottom: 6px;">
        <strong>${isEn ? s.title.en : s.title.ru}:</strong> ${isEn ? s.desc.en : s.desc.ru}
      </li>
    `).join('');

    const weaknessesHtml = data.weaknesses.map(w => `
      <li style="margin-bottom: 6px;">
        <strong>${isEn ? w.title.en : w.title.ru}:</strong> ${isEn ? w.desc.en : w.desc.ru}
      </li>
    `).join('');

    const rolesHtml = (isEn ? deepData.careers.idealRoles.en : deepData.careers.idealRoles.ru).map(r => `
      <span style="display:inline-block; padding: 4px 8px; margin: 3px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 11px;">${r}</span>
    `).join('');

    const idealMatchesHtml = deepData.relationships.idealMatches.map(m => `
      <div style="margin-bottom: 8px; padding: 6px 10px; background: #ecfdf5; border-left: 3px solid #10b981; border-radius: 4px;">
        <strong>${m.type} • ${isEn ? m.label.en : m.label.ru}:</strong> ${isEn ? m.synergy.en : m.synergy.ru}
      </div>
    `).join('');

    const challengingMatchHtml = `
      <div style="padding: 6px 10px; background: #fff1f2; border-left: 3px solid #f43f5e; border-radius: 4px;">
        <strong>${deepData.relationships.challengingMatch.type} • ${isEn ? deepData.relationships.challengingMatch.label.en : deepData.relationships.challengingMatch.label.ru}:</strong> ${isEn ? deepData.relationships.challengingMatch.tension.en : deepData.relationships.challengingMatch.tension.ru}
      </div>
    `;

    const printWindow = window.open('', '_blank', 'width=850,height=950');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} — Psychological Dossier</title>
        <meta charset="utf-8" />
        <style>
          @page { size: A4; margin: 18mm 16mm; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #111827;
            background: #ffffff;
            line-height: 1.5;
            font-size: 12px;
            padding: 20px;
          }
          h1 { font-size: 22px; font-weight: 800; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px; }
          h2 { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #374151; margin: 16px 0 8px 0; border-bottom: 1.5px solid #e5e7eb; padding-bottom: 4px; }
          h3 { font-size: 12px; font-weight: 700; margin: 8px 0 4px 0; }
          .motto { font-style: italic; font-size: 13px; color: #4b5563; margin-bottom: 14px; }
          .header-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px; }
          .grid-2 { display: flex; gap: 16px; margin-bottom: 14px; }
          .col { flex: 1; }
          .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px 14px; margin-bottom: 10px; }
          ul { margin: 4px 0 0 18px; padding: 0; }
          .badge { display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 4px; margin-bottom: 6px; }
          .footer { margin-top: 24px; padding-top: 10px; border-top: 1px dashed #d1d5db; font-size: 10px; color: #9ca3af; text-align: center; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          <span class="badge">The Oracle of Chance • Psychological Profile</span>
          <h1>${title}</h1>
          <div class="motto">"${motto}"</div>
          <p style="margin: 0; font-size: 11.5px; color: #374151;"><strong>${isEn ? "Psychologist's Assessment:" : "Заключение психолога:"}</strong> ${intro}</p>
        </div>

        <div class="grid-2">
          <div class="col card">
            <h2>${isEn ? '1. Cognitive Architecture' : '1. Когнитивная структура'}</h2>
            <p>${portrait}</p>
          </div>
          <div class="col card">
            <h2>${isEn ? '2. Learning & Inquiry Dynamic' : '2. Стиль познания'}</h2>
            <p>${learning}</p>
          </div>
        </div>

        <div class="grid-2">
          <div class="col card">
            <h2 style="color: #047857;">${isEn ? 'Cognitive Strengths' : 'Сильные стороны'}</h2>
            <ul>${strengthsHtml}</ul>
          </div>
          <div class="col card">
            <h2 style="color: #b91c1c;">${isEn ? 'Vulnerabilities & Blind Spots' : 'Слепые зоны и уязвимости'}</h2>
            <ul>${weaknessesHtml}</ul>
          </div>
        </div>

        <div class="card">
          <h2>${isEn ? '3. Career & Professional Architecture' : '3. Профессия и карьерная реализация'}</h2>
          <div style="margin-bottom: 8px;">
            <strong>${isEn ? 'Optimal Career Paths:' : 'Оптимальные сферы деятельности:'}</strong>
            <div style="margin-top: 4px;">${rolesHtml}</div>
          </div>
          <p style="margin: 6px 0;"><strong>${isEn ? 'Ideal Work Environment:' : 'Идеальная рабочая среда:'}</strong> ${workEnv}</p>
          <p style="margin: 6px 0;"><strong>${isEn ? 'Strategic Growth Advice:' : 'Совет по карьерному росту:'}</strong> ${careerGrowth}</p>
        </div>

        <div class="card">
          <h2>${isEn ? '4. Relationships & Compatibility' : '4. Отношения и совместимость'}</h2>
          <p style="margin: 4px 0 8px 0;"><strong>${isEn ? 'Communication Style:' : 'Стиль общения:'}</strong> ${commStyle}</p>
          <div style="margin-bottom: 8px;">
            <strong>${isEn ? 'High Synergy Partners:' : 'Наиболее гармоничные союзы:'}</strong>
            <div style="margin-top: 4px;">${idealMatchesHtml}</div>
          </div>
          <div>
            <strong>${isEn ? 'Complex / Growth Partnership:' : 'Требует взаимной адаптации:'}</strong>
            <div style="margin-top: 4px;">${challengingMatchHtml}</div>
          </div>
          <p style="margin: 8px 0 0 0;"><strong>${isEn ? 'Intimacy Advice:' : 'Совет для гармонии в паре:'}</strong> ${intimacy}</p>
        </div>

        <div class="card">
          <h2>${isEn ? '5. Philosophical Roots & Oracle Synergy' : '5. Философия и синергия с Оракулом'}</h2>
          <p style="margin: 4px 0;"><strong>${isEn ? 'Existential Drive:' : 'Экзистенциальный мотив:'}</strong> ${existMotive}</p>
          <p style="margin: 4px 0;"><strong>${isEn ? 'Resonating Philosophers:' : 'Близкие мыслители:'}</strong> ${philosophers}</p>
          <p style="margin: 4px 0;"><strong>${isEn ? 'Oracle Calibration:' : 'Настройка Оракула:'}</strong> ${oracleStrategy}</p>
        </div>

        <div class="footer">
          Generated via The Oracle of Chance • MBTI Archetype Dossier (${data.type})
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const categories: Array<{ id: 'analysts' | 'diplomats' | 'sentinels' | 'explorers'; labelEn: string; labelRu: string; types: string[] }> = [
    { id: 'analysts', labelEn: 'Analysts (NT)', labelRu: 'Аналитики (NT)', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
    { id: 'diplomats', labelEn: 'Diplomats (NF)', labelRu: 'Дипломаты (NF)', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
    { id: 'sentinels', labelEn: 'Sentinels (SJ)', labelRu: 'Хранители (SJ)', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
    { id: 'explorers', labelEn: 'Explorers (SP)', labelRu: 'Искатели (SP)', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] }
  ];

  return (
    <div 
      className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-5 md:p-6 overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl max-h-[88vh] sm:max-h-[92vh] flex flex-col rounded-2xl sm:rounded-[36px] md:rounded-[40px] border shadow-2xl overflow-hidden transition-all duration-300 animate-in zoom-in-95 cursor-default ${
          isRenoir 
            ? 'bg-[#180707] border-amber-800/40 text-amber-100 shadow-amber-950/80' 
            : 'bg-white border-black/10 text-black shadow-2xl'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className={`flex items-center justify-between px-3.5 sm:px-8 py-2.5 sm:py-5 border-b shrink-0 ${
          isRenoir ? 'border-amber-900/40 bg-amber-950/30' : 'border-black/5 bg-zinc-50/70'
        }`}>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center ${
              isRenoir ? 'bg-amber-900/60 text-amber-300' : 'bg-black text-white'
            }`}>
              <Icons.Encyclopedia className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-[7.5px] sm:text-[9px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] opacity-50 block leading-none">
                {isEn ? 'Psychological Profile & Learning Style' : 'Психологический портрет и стиль познания'}
              </span>
              <h2 className="text-xs sm:text-base md:text-lg font-bold tracking-tight mt-0.5 flex items-center gap-1.5 sm:gap-2">
                <span>{data.type}</span>
                <span className="opacity-40 font-light">•</span>
                <span className={isRenoir ? 'text-amber-300' : 'text-red-600'}>{isEn ? data.title.en : data.title.ru}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrint}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider border flex items-center gap-1 sm:gap-1.5 transition-all active:scale-95 ${
                isRenoir
                  ? 'border-amber-700/50 hover:bg-amber-900/40 text-amber-200'
                  : 'border-black/15 hover:bg-black/5 text-black'
              }`}
              title={isEn ? 'Print / Save PDF Dossier' : 'Распечатать / Сохранить в PDF'}
            >
              <Icons.Printer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{isEn ? 'Print / PDF' : 'Печать / PDF'}</span>
            </button>

            <button 
              onClick={onClose}
              className={`p-1 sm:p-2 rounded-full transition-transform hover:scale-110 active:scale-95 ${
                isRenoir ? 'hover:bg-amber-900/40 text-amber-200' : 'hover:bg-black/5 text-black'
              }`}
              title={isEn ? 'Close' : 'Закрыть'}
            >
              <Icons.Close className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 16 Personality Switcher Toolbar */}
        <div className={`px-3 sm:px-8 py-2 sm:py-3 border-b overflow-x-auto subtle-scrollbar flex flex-nowrap items-center gap-1.5 sm:gap-2 shrink-0 ${
          isRenoir ? 'border-amber-900/30 bg-[#120404]' : 'border-black/5 bg-zinc-100/60'
        }`}>
          <span className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-[0.2em] opacity-40 shrink-0 mr-1 hidden sm:inline">
            {isEn ? 'Explore Type:' : 'Выбрать тип:'}
          </span>
          {categories.map(cat => (
            <div key={cat.id} className="flex items-center gap-0.5 sm:gap-1 shrink-0 px-0.5 sm:px-1 border-r last:border-none border-current/10">
              {cat.types.map(t => {
                const isSelected = t === inspectedType;
                const isCurrentActive = currentProfile?.type === t;
                return (
                  <button
                    key={t}
                    onClick={() => setInspectedType(t)}
                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-mono font-bold tracking-wider transition-all duration-200 relative ${
                      isSelected
                        ? isRenoir
                          ? 'bg-amber-500 text-amber-950 shadow-md font-black scale-105'
                          : 'bg-black text-white shadow-md font-black scale-105'
                        : isRenoir
                          ? 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-200/75'
                          : 'bg-white hover:bg-zinc-200/80 text-black/75 border border-black/5'
                    }`}
                  >
                    {t}
                    {isCurrentActive && (
                      <span className={`absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                        isRenoir ? 'bg-emerald-400 ring-1.5 ring-[#180707]' : 'bg-emerald-500 ring-1.5 ring-white'
                      }`} title={isEn ? 'Active Profile' : 'Активный профиль'} />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto subtle-scrollbar p-3.5 sm:p-7 md:p-9 space-y-4 sm:space-y-7">
          
          {/* Header Hero Banner */}
          <div className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl border relative overflow-hidden ${
            isRenoir 
              ? 'bg-gradient-to-br from-amber-950/50 via-amber-900/20 to-[#180707] border-amber-800/40 text-amber-100' 
              : 'bg-gradient-to-br from-zinc-50 via-zinc-100/50 to-white border-black/10 text-black'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[8.5px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border ${
                  isRenoir ? 'border-amber-600/40 text-amber-300 bg-amber-950/60' : 'border-red-600/30 text-red-600 bg-red-50'
                }`}>
                  {isEn ? data.groupLabel.en : data.groupLabel.ru}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest opacity-60">
                  MBTI • {data.type}
                </span>
              </div>

              {onAskOracle && (
                <button
                  onClick={() => onAskOracle(
                    isEn
                      ? `Deliver an exhaustive in-depth psychological and philosophical analysis for archetype ${data.type} (${data.title.en}): explain core cognitive mechanics, unconscious shadow dynamics, interpersonal friction points, and existential destiny.`
                      : `Предоставь исчерпывающий глубинный психоаналитический и философский анализ архетипа ${data.type} (${data.title.ru}): раскрой структуру бессознательного, теневые компенсации, динамику межличностных отношений и экзистенциальное призвание.`
                  )}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm ${
                    isRenoir
                      ? 'border-amber-600/60 bg-amber-900/40 hover:bg-amber-800/60 text-amber-200'
                      : 'border-red-600/40 bg-red-50 hover:bg-red-100 text-red-700'
                  }`}
                  title={isEn ? "Ask Oracle for in-depth psychological analysis" : "Спросить Оракула для глубинного анализа"}
                >
                  <Icons.Sparkle className="w-3 h-3 text-amber-500 animate-spin-slow" />
                  <span>{isEn ? 'Ask Oracle: Full Portrait' : 'Спросить Оракула: Портрет'}</span>
                </button>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none mb-1.5 sm:mb-2">
              {isEn ? data.title.en : data.title.ru}
            </h1>
            <p className={`text-xs sm:text-base font-serif italic opacity-85 mb-3 sm:mb-4 ${
              isRenoir ? 'text-amber-200' : 'text-zinc-700'
            }`}>
              "{isEn ? data.motto.en : data.motto.ru}"
            </p>

            {/* Psychologist Introduction Card */}
            <div className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl border mb-3 sm:mb-4 ${
              isRenoir ? 'bg-black/30 border-amber-800/30 text-amber-100/90' : 'bg-white border-black/5 text-zinc-800'
            }`}>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-[0.25em] opacity-60">
                  {isEn ? "Psychologist's Assessment" : "Заключение психолога-аналитика"}
                </span>
              </div>
              <p className="text-[11.5px] sm:text-sm leading-relaxed font-sans">
                {isEn ? data.psychologistIntro.en : data.psychologistIntro.ru}
              </p>
            </div>

            {/* Curated External Reading Links Header */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono uppercase tracking-wider opacity-60 mr-1 flex items-center gap-1">
                <span>🔗</span> {isEn ? 'Authoritative References:' : 'Внешние источники и литература:'}
              </span>
              <a
                href={isEn ? `https://www.16personalities.com/${inspectedType.toLowerCase()}-personality` : `https://www.16personalities.com/ru/tip-lichnosti-${inspectedType.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9.5px] sm:text-[10.5px] font-semibold border transition-colors ${
                  isRenoir ? 'bg-amber-950/50 border-amber-800/50 hover:bg-amber-900/60 text-amber-300' : 'bg-white border-black/10 hover:bg-zinc-100 text-blue-700'
                }`}
              >
                <span>16Personalities</span>
                <span className="text-[9px] opacity-70">↗</span>
              </a>
              <a
                href={`https://www.truity.com/personality-type/${inspectedType}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9.5px] sm:text-[10.5px] font-semibold border transition-colors ${
                  isRenoir ? 'bg-amber-950/50 border-amber-800/50 hover:bg-amber-900/60 text-amber-300' : 'bg-white border-black/10 hover:bg-zinc-100 text-blue-700'
                }`}
              >
                <span>Truity MBTI</span>
                <span className="text-[9px] opacity-70">↗</span>
              </a>
              <a
                href={isEn ? "https://en.wikipedia.org/wiki/Jungian_cognitive_functions" : "https://ru.wikipedia.org/wiki/%D0%AE%D0%BD%D0%B3%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B5_%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8"}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9.5px] sm:text-[10.5px] font-semibold border transition-colors ${
                  isRenoir ? 'bg-amber-950/50 border-amber-800/50 hover:bg-amber-900/60 text-amber-300' : 'bg-white border-black/10 hover:bg-zinc-100 text-blue-700'
                }`}
              >
                <span>Jungian Functions</span>
                <span className="text-[9px] opacity-70">↗</span>
              </a>
              <a
                href="https://www.myersbriggs.org/type-description/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9.5px] sm:text-[10.5px] font-semibold border transition-colors ${
                  isRenoir ? 'bg-amber-950/50 border-amber-800/50 hover:bg-amber-900/60 text-amber-300' : 'bg-white border-black/10 hover:bg-zinc-100 text-blue-700'
                }`}
              >
                <span>Myers-Briggs Org</span>
                <span className="text-[9px] opacity-70">↗</span>
              </a>
              <a
                href="https://www.psychologytoday.com/us/basics/personality"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9.5px] sm:text-[10.5px] font-semibold border transition-colors ${
                  isRenoir ? 'bg-amber-950/50 border-amber-800/50 hover:bg-amber-900/60 text-amber-300' : 'bg-white border-black/10 hover:bg-zinc-100 text-blue-700'
                }`}
              >
                <span>Psychology Today</span>
                <span className="text-[9px] opacity-70">↗</span>
              </a>
            </div>
          </div>

          {/* Deep Psychological Portrait & Learning Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
            
            {/* Deep Cognitive Portrait */}
            <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between space-y-3 ${
              isRenoir ? 'bg-amber-950/20 border-amber-900/30' : 'bg-zinc-50 border-black/5'
            }`}>
              <div className="space-y-2 sm:space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] opacity-60 flex items-center gap-1.5 sm:gap-2">
                    <Icons.Sparkle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
                    {isEn ? 'Cognitive Architecture' : 'Когнитивная структура'}
                  </h3>
                  <a
                    href={isEn ? "https://en.wikipedia.org/wiki/Psychological_Types" : "https://ru.wikipedia.org/wiki/%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D1%82%D0%B8%D0%BF%D1%8B"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] sm:text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 opacity-80"
                  >
                    <span>Jung Types</span>
                    <span>↗</span>
                  </a>
                </div>
                <p className="text-[11.5px] sm:text-sm leading-relaxed opacity-85">
                  {isEn ? data.deepPortrait.en : data.deepPortrait.ru}
                </p>
              </div>

              {onAskOracle && (
                <div className="pt-2 border-t border-current/10">
                  <button
                    onClick={() => onAskOracle(
                      isEn
                        ? `Provide an in-depth breakdown of ${data.type}'s cognitive architecture: Analyze the 8-function stack (Dominant, Auxiliary, Tertiary, Inferior, and 4 Shadow Archetypes) and unconscious processing loops.`
                        : `Предоставь углубленный анализ когнитивной структуры ${data.type}: разбери 8 юнговских функций (доминантную, вспомогательную, третичную, инфериорную и 4 теневых архетипа) и механизмы обработки информации.`
                    )}
                    className={`w-full py-1.5 px-2.5 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 border transition-all active:scale-98 ${
                      isRenoir
                        ? 'border-amber-700/50 bg-amber-950/40 hover:bg-amber-900/50 text-amber-200'
                        : 'border-black/10 bg-white hover:bg-zinc-100 text-black shadow-sm'
                    }`}
                  >
                    <Icons.Sparkle className="w-3 h-3 text-amber-500" />
                    <span>{isEn ? 'Ask Oracle: Deep Cognitive Stack' : 'Спросить Оракула: Когнитивный стек'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Learning Style & Knowledge Acquisition */}
            <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between space-y-3 ${
              isRenoir ? 'bg-amber-950/20 border-amber-900/30' : 'bg-zinc-50 border-black/5'
            }`}>
              <div className="space-y-2 sm:space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] opacity-60 flex items-center gap-1.5 sm:gap-2">
                    <Icons.Encyclopedia className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                    {isEn ? 'Learning & Inquiry Dynamic' : 'Стиль познания и обучение'}
                  </h3>
                  <a
                    href="https://openpsychometrics.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] sm:text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 opacity-80"
                  >
                    <span>Psychometrics</span>
                    <span>↗</span>
                  </a>
                </div>
                <p className="text-[11.5px] sm:text-sm leading-relaxed opacity-85">
                  {isEn ? data.learningStyle.en : data.learningStyle.ru}
                </p>
              </div>

              {onAskOracle && (
                <div className="pt-2 border-t border-current/10">
                  <button
                    onClick={() => onAskOracle(
                      isEn
                        ? `Design an accelerated learning methodology and epistemic roadmap specifically tailored for ${data.type}'s intellectual architecture: mental models, rapid synthesis techniques, and epistemic pitfalls.`
                        : `Разработай систему ускоренного обучения и эпистемическую методологию специально для интеллекта ${data.type}: ментальные модели, техники скоростного синтеза знаний и методы преодоления когнитивных ловушек.`
                    )}
                    className={`w-full py-1.5 px-2.5 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 border transition-all active:scale-98 ${
                      isRenoir
                        ? 'border-amber-700/50 bg-amber-950/40 hover:bg-amber-900/50 text-amber-200'
                        : 'border-black/10 bg-white hover:bg-zinc-100 text-black shadow-sm'
                    }`}
                  >
                    <Icons.Encyclopedia className="w-3 h-3 text-red-500" />
                    <span>{isEn ? 'Ask Oracle: Epistemic Roadmap' : 'Спросить Оракула: Стратегия обучения'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Strengths & Weaknesses 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-6">
            
            {/* Strengths */}
            <div className="space-y-2 sm:space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-emerald-500/30 mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-emerald-500 font-bold text-xs sm:text-sm">✦</span>
                    <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
                      {isEn ? 'Cognitive Strengths' : 'Сильные стороны мышления'}
                    </h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:gap-2.5">
                  {data.strengths.map((s, idx) => (
                    <div 
                      key={idx}
                      className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-colors ${
                        isRenoir ? 'bg-emerald-950/15 border-emerald-800/30' : 'bg-emerald-50/40 border-emerald-200/50'
                      }`}
                    >
                      <h4 className="text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
                        {isEn ? s.title.en : s.title.ru}
                      </h4>
                      <p className="text-[11px] sm:text-xs leading-relaxed opacity-80">
                        {isEn ? s.desc.en : s.desc.ru}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {onAskOracle && (
                <button
                  onClick={() => onAskOracle(
                    isEn
                      ? `How can archetype ${data.type} amplify and operationalize their innate cognitive superpowers (${data.strengths.map(s => s.title.en).join(', ')}) to achieve exponential mastery?`
                      : `Как архетипу ${data.type} максимально раскрыть и масштабировать свои ключевые сильные стороны (${data.strengths.map(s => s.title.ru).join(', ')}) для достижения выдающегося мастерства?`
                  )}
                  className={`w-full py-1.5 px-2.5 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 border transition-all active:scale-98 mt-2 ${
                    isRenoir
                      ? 'border-emerald-700/50 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300'
                      : 'border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <span>✦</span>
                  <span>{isEn ? 'Ask Oracle: Superpower Mastery' : 'Спросить Оракула: Развитие суперсил'}</span>
                </button>
              )}
            </div>

            {/* Weaknesses / Vulnerabilities */}
            <div className="space-y-2 sm:space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-red-500/30 mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-red-500 font-bold text-xs sm:text-sm">▲</span>
                    <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-red-600 dark:text-red-400">
                      {isEn ? 'Vulnerabilities & Blind Spots' : 'Уязвимости и слепые зоны'}
                    </h3>
                  </div>
                  <a
                    href="https://en.wikipedia.org/wiki/Shadow_(psychology)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] sm:text-[10px] text-red-600 hover:underline flex items-center gap-0.5 opacity-80"
                  >
                    <span>Jung Shadow</span>
                    <span>↗</span>
                  </a>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:gap-2.5">
                  {data.weaknesses.map((w, idx) => (
                    <div 
                      key={idx}
                      className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-colors ${
                        isRenoir ? 'bg-red-950/15 border-red-800/30' : 'bg-red-50/40 border-red-200/50'
                      }`}
                    >
                      <h4 className="text-[11px] sm:text-xs font-bold text-red-600 dark:text-red-400 mb-0.5">
                        {isEn ? w.title.en : w.title.ru}
                      </h4>
                      <p className="text-[11px] sm:text-xs leading-relaxed opacity-80">
                        {isEn ? w.desc.en : w.desc.ru}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {onAskOracle && (
                <button
                  onClick={() => onAskOracle(
                    isEn
                      ? `Conduct a deep psychoanalytic shadow interrogation for ${data.type}: examine blind spots (${data.weaknesses.map(w => w.title.en).join(', ')}), defense mechanisms, and prescribe concrete shadow integration practices.`
                      : `Проведи глубокую теневую психоаналитическую сессию для ${data.type}: разбери слепые зоны (${data.weaknesses.map(w => w.title.ru).join(', ')}), защитные механизмы психики и дай точные практики интеграции Тени.`
                  )}
                  className={`w-full py-1.5 px-2.5 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 border transition-all active:scale-98 mt-2 ${
                    isRenoir
                      ? 'border-red-700/50 bg-red-950/30 hover:bg-red-900/40 text-red-300'
                      : 'border-red-200 bg-red-50/60 hover:bg-red-100 text-red-800'
                  }`}
                >
                  <span>▲</span>
                  <span>{isEn ? 'Ask Oracle: Shadow Integration' : 'Спросить Оракула: Интеграция Тени'}</span>
                </button>
              )}
            </div>
          </div>

          {/* SECTION: Choice of Profession & Career Architecture */}
          <div className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl border space-y-3 sm:space-y-5 ${
            isRenoir ? 'bg-amber-950/20 border-amber-900/30' : 'bg-zinc-50 border-black/5'
          }`}>
            <div className="flex items-center justify-between border-b pb-2 sm:pb-3 border-current/10 flex-wrap gap-2">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] flex items-center gap-1.5 sm:gap-2">
                <Icons.Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                {isEn ? 'Career & Professional Realization' : 'Выбор профессии и карьерная реализация'}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.truity.com/personality-type/${inspectedType}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] sm:text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 opacity-80"
                >
                  <span>Truity Careers</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://www.onetonline.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] sm:text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 opacity-80"
                >
                  <span>O*NET Index</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Ideal Roles Chips */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider opacity-60 block">
                {isEn ? 'Optimal Career Paths & Specialties:' : 'Оптимальные сферы и профессии:'}
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {(isEn ? deepData.careers.idealRoles.en : deepData.careers.idealRoles.ru).map((role, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium border ${
                      isRenoir 
                        ? 'bg-amber-950/40 border-amber-700/40 text-amber-200' 
                        : 'bg-white border-black/10 text-zinc-800 shadow-sm'
                    }`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Work Environment & Growth Advice 2-Col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${
                isRenoir ? 'bg-black/20 border-amber-800/30' : 'bg-white border-black/5'
              }`}>
                <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-500 mb-1">
                  {isEn ? 'Ideal Work Environment' : 'Идеальная рабочая среда'}
                </h4>
                <p className="text-[11.5px] sm:text-xs leading-relaxed opacity-85">
                  {isEn ? deepData.careers.workEnvironment.en : deepData.careers.workEnvironment.ru}
                </p>
              </div>

              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${
                isRenoir ? 'bg-black/20 border-amber-800/30' : 'bg-white border-black/5'
              }`}>
                <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                  {isEn ? 'Strategic Growth Advice' : 'Совет по карьерному росту'}
                </h4>
                <p className="text-[11.5px] sm:text-xs leading-relaxed opacity-85">
                  {isEn ? deepData.careers.growthAdvice.en : deepData.careers.growthAdvice.ru}
                </p>
              </div>
            </div>

            {onAskOracle && (
              <div className="pt-2 border-t border-current/10">
                <button
                  onClick={() => onAskOracle(
                    isEn
                      ? `Formulate a comprehensive executive career strategy and niche domination blueprint for archetype ${data.type}: high-leverage domains, leadership style, entrepreneurial ventures, and 10-year trajectory.`
                      : `Сформулируй стратегический карьерный мастер-план и траекторию лидерства для архетипа ${data.type}: высокодоходные ниши, персональный стиль руководства, стартапы и 10-летний вектор развития.`
                  )}
                  className={`w-full py-2 px-3 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 border transition-all active:scale-98 ${
                    isRenoir
                      ? 'border-blue-700/50 bg-blue-950/30 hover:bg-blue-900/40 text-blue-300'
                      : 'border-blue-200 bg-blue-50/60 hover:bg-blue-100 text-blue-800'
                  }`}
                >
                  <Icons.Settings className="w-3 h-3 text-blue-500" />
                  <span>{isEn ? 'Ask Oracle: High-Impact Career Roadmap' : 'Спросить Оракула: Карьерная стратегия'}</span>
                </button>
              </div>
            )}
          </div>

          {/* SECTION: Relationships & Interpersonal Compatibility */}
          <div className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl border space-y-3 sm:space-y-5 ${
            isRenoir ? 'bg-amber-950/20 border-amber-900/30' : 'bg-zinc-50 border-black/5'
          }`}>
            <div className="flex items-center justify-between border-b pb-2 sm:pb-3 border-current/10 flex-wrap gap-2">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] flex items-center gap-1.5 sm:gap-2">
                <span className="text-rose-500">♥</span>
                {isEn ? 'Relationships & Compatibility' : 'Отношения и совместимость'}
              </h3>
              <a
                href="https://en.wikipedia.org/wiki/Socionics#Intertype_relations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] sm:text-[10px] text-rose-600 hover:underline flex items-center gap-0.5 opacity-80"
              >
                <span>Intertype Synergy</span>
                <span>↗</span>
              </a>
            </div>

            {/* Communication Style */}
            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${
              isRenoir ? 'bg-black/20 border-amber-800/30' : 'bg-white border-black/5'
            }`}>
              <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-500 mb-1">
                {isEn ? 'Communication & Dialogue Style' : 'Стиль общения и диалога'}
              </h4>
              <p className="text-[11.5px] sm:text-xs leading-relaxed opacity-85">
                {isEn ? deepData.relationships.communicationStyle.en : deepData.relationships.communicationStyle.ru}
              </p>
            </div>

            {/* Compatibility Synergy Grid */}
            <div className="space-y-2 sm:space-y-3">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider opacity-60 block">
                {isEn ? 'High Synergy Partners (Ideal Polarity):' : 'Наиболее гармоничные союзы:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {deepData.relationships.idealMatches.map((match, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${
                      isRenoir 
                        ? 'bg-emerald-950/15 border-emerald-800/30 text-amber-100' 
                        : 'bg-emerald-50/40 border-emerald-200/60 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-emerald-500 text-white">
                        {match.type}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {isEn ? match.label.en : match.label.ru}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-[11.5px] leading-relaxed opacity-80 mt-1">
                      {isEn ? match.synergy.en : match.synergy.ru}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenging Match & Intimacy Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 pt-1">
              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${
                isRenoir ? 'bg-rose-950/15 border-rose-900/30' : 'bg-rose-50/40 border-rose-200/60'
              }`}>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-rose-500 text-white">
                    {deepData.relationships.challengingMatch.type}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-rose-600 dark:text-rose-400">
                    {isEn ? deepData.relationships.challengingMatch.label.en : deepData.relationships.challengingMatch.label.ru}
                  </span>
                </div>
                <p className="text-[11px] sm:text-[11.5px] leading-relaxed opacity-80 mt-1">
                  {isEn ? deepData.relationships.challengingMatch.tension.en : deepData.relationships.challengingMatch.tension.ru}
                </p>
              </div>

              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${
                isRenoir ? 'bg-black/20 border-amber-800/30' : 'bg-white border-black/5'
              }`}>
                <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                  {isEn ? 'Intimacy & Harmony Advice' : 'Совет для гармонии в паре'}
                </h4>
                <p className="text-[11.5px] sm:text-xs leading-relaxed opacity-85">
                  {isEn ? deepData.relationships.intimacyAdvice.en : deepData.relationships.intimacyAdvice.ru}
                </p>
              </div>
            </div>

            {onAskOracle && (
              <div className="pt-2 border-t border-current/10">
                <button
                  onClick={() => onAskOracle(
                    isEn
                      ? `Provide an in-depth relational treatise on ${data.type}: communication alchemistry, emotional vulnerability, intimacy patterns, and handling friction with contrasting personalities.`
                      : `Раскрой глубинную алхимию отношений архетипа ${data.type}: паттерны эмоциональной близости, язык привязанности, преодоление кризисов доверия и ключи к гармонии с противоположными типами.`
                  )}
                  className={`w-full py-2 px-3 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 border transition-all active:scale-98 ${
                    isRenoir
                      ? 'border-rose-700/50 bg-rose-950/30 hover:bg-rose-900/40 text-rose-300'
                      : 'border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-800'
                  }`}
                >
                  <span className="text-rose-500">♥</span>
                  <span>{isEn ? 'Ask Oracle: Relational Alchemy' : 'Спросить Оракула: Алхимия отношений'}</span>
                </button>
              </div>
            )}
          </div>

          {/* SECTION: 4 Cognitive Axes Breakdown */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] opacity-60">
                {isEn ? 'Cognitive Axes Tuning' : 'Калибровка когнитивных осей'}
              </h3>
              <a
                href="https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] sm:text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 opacity-80"
              >
                <span>Dichotomy Theory</span>
                <span>↗</span>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${isRenoir ? 'bg-amber-950/20 border-amber-900/30' : 'bg-zinc-50 border-black/5'}`}>
                <span className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-widest opacity-40 block mb-0.5 sm:mb-1">Energy</span>
                <h4 className="text-[11px] sm:text-xs font-bold mb-0.5 sm:mb-1">{isEn ? data.axes.energy.label.en : data.axes.energy.label.ru}</h4>
                <p className="text-[10.5px] sm:text-[11px] leading-relaxed opacity-75">{isEn ? data.axes.energy.desc.en : data.axes.energy.desc.ru}</p>
              </div>

              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${isRenoir ? 'bg-amber-950/20 border-amber-900/30' : 'bg-zinc-50 border-black/5'}`}>
                <span className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-widest opacity-40 block mb-0.5 sm:mb-1">Information</span>
                <h4 className="text-[11px] sm:text-xs font-bold mb-0.5 sm:mb-1">{isEn ? data.axes.information.label.en : data.axes.information.label.ru}</h4>
                <p className="text-[10.5px] sm:text-[11px] leading-relaxed opacity-75">{isEn ? data.axes.information.desc.en : data.axes.information.desc.ru}</p>
              </div>

              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${isRenoir ? 'bg-amber-950/20 border-amber-900/30' : 'bg-zinc-50 border-black/5'}`}>
                <span className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-widest opacity-40 block mb-0.5 sm:mb-1">Decision</span>
                <h4 className="text-[11px] sm:text-xs font-bold mb-0.5 sm:mb-1">{isEn ? data.axes.decision.label.en : data.axes.decision.label.ru}</h4>
                <p className="text-[10.5px] sm:text-[11px] leading-relaxed opacity-75">{isEn ? data.axes.decision.desc.en : data.axes.decision.desc.ru}</p>
              </div>

              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${isRenoir ? 'bg-amber-950/20 border-amber-900/30' : 'bg-zinc-50 border-black/5'}`}>
                <span className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-widest opacity-40 block mb-0.5 sm:mb-1">Lifestyle</span>
                <h4 className="text-[11px] sm:text-xs font-bold mb-0.5 sm:mb-1">{isEn ? data.axes.lifestyle.label.en : data.axes.lifestyle.label.ru}</h4>
                <p className="text-[10.5px] sm:text-[11px] leading-relaxed opacity-75">{isEn ? data.axes.lifestyle.desc.en : data.axes.lifestyle.desc.ru}</p>
              </div>
            </div>

            {onAskOracle && (
              <button
                onClick={() => onAskOracle(
                  isEn
                    ? `Explore the dialectical equilibrium between the 4 cognitive polarities for ${data.type} (${data.type[0]} vs ${data.type[0] === 'I' ? 'E' : 'I'}, ${data.type[1]} vs ${data.type[1] === 'N' ? 'S' : 'N'}, ${data.type[2]} vs ${data.type[2] === 'T' ? 'F' : 'T'}, ${data.type[3]} vs ${data.type[3] === 'J' ? 'P' : 'J'}): how to balance these opposing forces.`
                    : `Исследуй диалектическое равновесие 4 когнитивных полярностей для типа ${data.type}: как гармонизировать противоборствующие векторы восприятия и суждения для целостности личности.`
                )}
                className={`w-full py-1.5 px-2.5 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 border transition-all active:scale-98 mt-1 ${
                  isRenoir
                    ? 'border-amber-700/40 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200'
                    : 'border-black/10 bg-white hover:bg-zinc-100 text-black shadow-sm'
                }`}
              >
                <Icons.Sparkle className="w-3 h-3 text-amber-500" />
                <span>{isEn ? 'Ask Oracle: Polarities Dialectic' : 'Спросить Оракула: Диалектика полярностей'}</span>
              </button>
            )}
          </div>

          {/* SECTION: Philosophy, Existential Motive & Oracle Synergy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
            <div className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border flex flex-col justify-between ${
              isRenoir ? 'bg-amber-950/30 border-amber-800/30 text-amber-200' : 'bg-zinc-50 border-black/5 text-zinc-800'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                  <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1 sm:gap-1.5">
                    <Icons.Mind className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                    {isEn ? 'Existential Motive & Philosophy' : 'Экзистенциальный мотив и философия'}
                  </h4>
                  <a
                    href="https://plato.stanford.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] sm:text-[10px] text-purple-600 hover:underline flex items-center gap-0.5 opacity-80"
                  >
                    <span>Stanford SEP</span>
                    <span>↗</span>
                  </a>
                </div>
                <p className="text-[11px] sm:text-xs leading-relaxed opacity-90 mb-1.5 sm:mb-2">
                  <strong>{isEn ? 'Core Drive:' : 'Движущая сила:'}</strong> {isEn ? deepData.philosophy.existentialMotive.en : deepData.philosophy.existentialMotive.ru}
                </p>
                <p className="text-[10.5px] sm:text-[11.5px] leading-relaxed opacity-75">
                  <strong>{isEn ? 'Kinship Thinkers:' : 'Близкие мыслители:'}</strong> {isEn ? deepData.philosophy.idealPhilosophers.en : deepData.philosophy.idealPhilosophers.ru}
                </p>
              </div>

              {onAskOracle && (
                <button
                  onClick={() => onAskOracle(
                    isEn
                      ? `Synthesize the existential philosophy of ${data.type}: core metaphysical drivers, dialogue with ${deepData.philosophy.idealPhilosophers.en}, and answering the existential crisis of meaning.`
                      : `Создай глубокий философский синтез экзистенциального пути ${data.type}: диалог с мыслителями (${deepData.philosophy.idealPhilosophers.ru}), преодоление экзистенциального вакуума и обретение высшего смысла.`
                  )}
                  className={`w-full mt-3 py-1.5 px-2.5 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 border transition-all active:scale-98 ${
                    isRenoir
                      ? 'border-purple-700/50 bg-purple-950/30 hover:bg-purple-900/40 text-purple-300'
                      : 'border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-purple-800'
                  }`}
                >
                  <Icons.Mind className="w-3 h-3 text-purple-500" />
                  <span>{isEn ? 'Ask Oracle: Existential Philosophy' : 'Спросить Оракула: Философия смысла'}</span>
                </button>
              )}
            </div>

            <div className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border flex flex-col justify-between ${
              isRenoir ? 'bg-amber-950/40 border-amber-700/40 text-amber-200' : 'bg-amber-50/70 border-amber-300 text-amber-950'
            }`}>
              <div>
                <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5 text-amber-600">
                  <Icons.Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                  {isEn ? 'Oracle Tuning Strategy' : 'Рекомендация по настройке Оракула'}
                </h4>
                <p className="text-[11px] sm:text-xs leading-relaxed opacity-90">
                  {isEn ? data.oracleAdvice.en : data.oracleAdvice.ru}
                </p>
              </div>

              {onAskOracle && (
                <button
                  onClick={() => onAskOracle(
                    isEn
                      ? `How can an ${data.type} mind optimize their queries to the Council of Philosophers to unlock groundbreaking synchronicities and transcendent clarity?`
                      : `Как человеку с типом мышления ${data.type} формулировать запросы к Совету Философов, чтобы активировать максимальную синергию и глубинные инсайты?`
                  )}
                  className={`w-full mt-3 py-1.5 px-2.5 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 border transition-all active:scale-98 ${
                    isRenoir
                      ? 'border-amber-600/50 bg-amber-900/40 hover:bg-amber-800/50 text-amber-200'
                      : 'border-amber-300 bg-amber-100/60 hover:bg-amber-200 text-amber-900'
                  }`}
                >
                  <Icons.Settings className="w-3 h-3 text-amber-600" />
                  <span>{isEn ? 'Ask Oracle: Query Optimization' : 'Спросить Оракула: Настройка запросов'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Oracle Deep Inquiry Custom Bar */}
          {onAskOracle && (
            <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-inner ${
              isRenoir
                ? 'bg-gradient-to-r from-[#200b0b] to-[#160606] border-amber-700/50 text-amber-100'
                : 'bg-gradient-to-r from-zinc-100 via-white to-zinc-50 border-black/15 text-zinc-900'
            }`}>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Icons.Sparkle className="w-4 h-4 text-amber-500 animate-pulse" />
                <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em]">
                  {isEn ? 'Custom In-Depth Oracle Consultation' : 'Глубинная консультация с Оракулом'}
                </h4>
              </div>
              <p className="text-[11px] sm:text-xs leading-relaxed opacity-80 mb-3">
                {isEn 
                  ? `Ask the 10-Philosopher Council any targeted question tuned to the ${data.type} cognitive archetype.`
                  : `Задай Совету из 10 мыслителей любой персональный вопрос с учетом когнитивного архетипа ${data.type}.`}
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!customOracleQuestion.trim()) return;
                  const fullQ = isEn
                    ? `[Archetype ${data.type} Deep Inquiry]: ${customOracleQuestion.trim()}`
                    : `[Глубинный запрос архетипа ${data.type}]: ${customOracleQuestion.trim()}`;
                  onAskOracle(fullQ);
                }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="text"
                  value={customOracleQuestion}
                  onChange={(e) => setCustomOracleQuestion(e.target.value)}
                  placeholder={isEn ? `Ask anything regarding ${data.type} mind, life, career, or love...` : `Спроси о мышлении, судьбе, карьере или отношениях ${data.type}...`}
                  className={`flex-1 px-3.5 py-2 rounded-xl text-xs border outline-none transition-all ${
                    isRenoir
                      ? 'bg-black/40 border-amber-800/60 text-amber-100 placeholder-amber-400/40 focus:border-amber-500'
                      : 'bg-white border-black/20 text-black placeholder-zinc-400 focus:border-black'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!customOracleQuestion.trim()}
                  className={`px-4 py-2 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-40 flex items-center justify-center gap-1.5 shrink-0 ${
                    isRenoir
                      ? 'bg-amber-500 hover:bg-amber-400 text-amber-950'
                      : 'bg-black hover:bg-red-600 text-white'
                  }`}
                >
                  <Icons.Sparkle className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Inquire' : 'Спросить'}</span>
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className={`px-3.5 sm:px-8 py-2.5 sm:py-4 border-t shrink-0 flex flex-wrap items-center justify-between gap-2 sm:gap-4 ${
          isRenoir ? 'border-amber-900/40 bg-amber-950/30' : 'border-black/5 bg-zinc-50/70'
        }`}>
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2.5">
            <button
              onClick={() => {
                onClose();
                onRedoTest();
              }}
              className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest border transition-all active:scale-95 flex items-center gap-1.5 ${
                isRenoir 
                  ? 'border-amber-700/50 hover:bg-amber-900/50 text-amber-300' 
                  : 'border-black/20 hover:bg-black/5 text-black'
              }`}
            >
              <Icons.Sparkle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{isEn ? 'Retake 10-Q' : 'Тест заново'}</span>
            </button>

            {currentProfile && onClearProfile && (
              <button
                onClick={handleClear}
                className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest border transition-all active:scale-95 flex items-center gap-1.5 ${
                  isRenoir
                    ? 'border-red-800/40 hover:bg-red-950/50 text-red-400'
                    : 'border-red-200 hover:bg-red-50 text-red-600'
                }`}
                title={isEn ? 'Clear saved learning profile' : 'Сбросить сохраненный профиль'}
              >
                <Icons.Trash className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{isEn ? 'Clear' : 'Сбросить'}</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest border transition-all active:scale-95 flex items-center gap-1.5 ${
                isRenoir
                  ? 'border-amber-700/40 hover:bg-amber-900/40 text-amber-200'
                  : 'border-black/15 hover:bg-black/5 text-black'
              }`}
            >
              <Icons.Printer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{isEn ? 'PDF' : 'PDF'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 ml-auto sm:ml-0">
            {appliedNotification && (
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-500 animate-in fade-in">
                ✓ {isEn ? 'Activated!' : 'Применен!'}
              </span>
            )}
            {clearedNotification && (
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-red-500 animate-in fade-in">
                ✓ {isEn ? 'Cleared!' : 'Сброшен!'}
              </span>
            )}
            <button
              onClick={handleApply}
              className={`px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.15em] transition-all active:scale-95 shadow-md ${
                isActiveSelected
                  ? isRenoir
                    ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                    : 'bg-black/5 border border-black/30 text-black font-bold'
                  : isRenoir
                    ? 'bg-amber-500 text-amber-950 hover:bg-amber-400 font-black'
                    : 'bg-black text-white hover:bg-red-600 font-black'
              }`}
            >
              {isActiveSelected 
                ? (isEn ? '✓ Active' : '✓ Текущий') 
                : (isEn ? `Apply ${inspectedType}` : `Выбрать ${inspectedType}`)}
            </button>
            <button
              onClick={onClose}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity`}
            >
              {isEn ? 'Close' : 'Закрыть'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
