
import styles from './Button.module.scss'

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset"
  size?: "sm" | "md" | "lg"
  children: JSX.Element | string,
  className?: string
  disabled?: boolean
}

const Button = ({onClick, disabled=false, type="button", size, className, children}: ButtonProps) => (
  <button 
    type={type}
    disabled={disabled}
    className={`
      ${className}
      ${styles.button}
      ${styles.button_bestia}
      ${size === 'sm' ? 'px-1' : 'px-8'}

      min-w-16 py-2 
      whitespace-nowrap nowrap
      border border-transparent rounded-md
      text-sm
      disabled bg-main text-white
      focus:bg-opacity-50 focus:outline-none 
      active:bg-opacity-50 
    `}
    onClick={onClick}
  >
    <div className={styles.button__bg}></div>
    <span className={styles.button__span}>{children}</span>
  </button>
)
export default Button