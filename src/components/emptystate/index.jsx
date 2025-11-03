import { translations } from '../../translations.js';

export default function EmptyState({ type = 'initial', language = 'en' }) {
  const t = translations[language];
  
  const states = {
    initial: {
      icon: '🌤️',
      title: t.welcomeTitle,
      message: t.welcomeMessage,
      tip: t.welcomeTip
    },
    noResults: {
      icon: '🔍',
      title: t.noResultsTitle,
      message: t.noResultsMessage,
      tip: t.noResultsTip
    },
    error: {
      icon: '⚠️',
      title: t.errorTitle,
      message: t.errorMessage,
      tip: t.errorTip
    }
  };

  const state = states[type] || states.initial;

  return (
    <div className="empty-state">
      <div className="empty-icon">{state.icon}</div>
      <h3 className="empty-title">{state.title}</h3>
      <p className="empty-message">{state.message}</p>
      <p className="empty-tip">{state.tip}</p>
    </div>
  );
}
