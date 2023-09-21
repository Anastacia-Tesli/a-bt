import { useState, useEffect, useRef, useMemo } from 'react';

import styles from './Select.module.scss';

function Select({ label, options, setOption }) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const [hintOpen, setHintOpen] = useState(false);
  const containerRef = useRef(null);

  function useOutsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setHintOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideClick(containerRef);

  const changeValue = (e) => {
    setValue(e.target.value);
    setOption(e.target.value);
  };

  const filter = (value) => {
    return options.filter((animal) => animal.toLowerCase().includes(value.toLowerCase()));
  };

  const filtered = useMemo(() => filter(value), [value]);

  return (
    <div className={styles.container} ref={containerRef}>
      <label htmlFor={label} className={`${styles.label} ${focus && styles.visible}`}>
        {label}
      </label>
      <input
        type='text'
        autoComplete='off'
        id={label}
        placeholder={label}
        className={styles.input}
        value={value}
        onFocus={() => {
          setFocus(true);
          setHintOpen(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        onChange={changeValue}
      />
      {hintOpen && (
        <div className={styles.hints}>
          {filtered.length > 0 ? (
            filtered.map((hint) => (
              <span
                className={styles.hint}
                key={hint}
                onClick={() => {
                  setValue(hint);
                  setOption(hint);
                  setHintOpen(false);
                }}
              >
                {hint}
              </span>
            ))
          ) : (
            <span className={styles.empty}>No options</span>
          )}
        </div>
      )}
    </div>
  );
}

export default Select;
