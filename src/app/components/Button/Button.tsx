'use client'; 

import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant: 'primaryLarge' | 'primarySmall' | 'secondary' | 'delete';
}

const Button: React.FC<ButtonProps> = ({ text, variant, onClick }) => (
  <button onClick={onClick} className={styles[variant]}>
    {text}
  </button>
);

export default Button;
