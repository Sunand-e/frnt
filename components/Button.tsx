import styles from './Button.module.scss'

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset"
  children: JSX.Element | string,
  className?: string
}

const Button = ({onClick, type="button", className, children}: ButtonProps) => (
  <button 
    type={type} 
    className={`
      ${className}
      ${styles.button}
      ${styles.button_bestia}
      min-w-16 py-2 px-8
      whitespace-nowrap nowrap
      border border-transparent rounded-md
      text-sm
      bg-main text-white
      focus:bg-opacity-50 focus:outline-none 
      active:bg-opacity-50 
    `}
    onClick={onClick}
  >
    <div className={styles.button__bg}></div>
    <span>{children}</span>
  </button>
)
export default Button