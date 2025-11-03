import { useState } from 'react';

export default function Tooltip({ children, text, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={`tooltip tooltip-${position}`}>
          {text}
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
}
