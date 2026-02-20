import {
  useState,
  useRef,
  useCallback,
  cloneElement,
  type ReactNode,
  type ReactElement,
  type RefCallback,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.css';

type Position = 'top' | 'bottom' | 'left' | 'right';

interface TriggerProps {
  ref?: RefCallback<HTMLElement>;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

interface TooltipProps {
  content: ReactNode;
  position?: Position;
  children: ReactElement<TriggerProps>;
}

export function Tooltip({ content, position = 'top', children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const callbackRef = useCallback((el: HTMLElement | null) => {
    triggerRef.current = el;
  }, []);

  const show = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();

    switch (position) {
      case 'top':
        setCoords({ top: rect.top, left: rect.left + rect.width / 2 });
        break;
      case 'bottom':
        setCoords({ top: rect.bottom, left: rect.left + rect.width / 2 });
        break;
      case 'left':
        setCoords({ top: rect.top + rect.height / 2, left: rect.left });
        break;
      case 'right':
        setCoords({ top: rect.top + rect.height / 2, left: rect.right });
        break;
    }

    setVisible(true);
  };

  const hide = () => setVisible(false);

  // eslint-disable-next-line react-hooks/refs -- callback ref is not read during render
  const child = cloneElement(children, {
    ref: callbackRef,
    onMouseEnter: (e: React.MouseEvent) => {
      children.props.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      children.props.onMouseLeave?.(e);
      hide();
    },
  });

  return (
    <>
      {child}
      {visible &&
        createPortal(
          <div
            className={`${styles.tooltip} ${styles[position]}`}
            style={{ top: coords.top, left: coords.left }}
            role="tooltip"
          >
            <div className={styles.content}>{content}</div>
            <div className={styles.arrow} />
          </div>,
          document.body,
        )}
    </>
  );
}
