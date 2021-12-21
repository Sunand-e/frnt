import styles from './Button.module.scss'

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset"
  children: JSX.Element | string
}

const Button = ({onClick, type="button", children}: ButtonProps) => (
  <button type={type} className={`${styles.button} nowrap focus:bg-opacity-50 min-w-16 focus:outline-none active:bg-opacity-50 h-8 bg-main rounded-md font-base text-base px-8 text-white whitespace-nowrap`} onClick={onClick}>{children}</button>
)
export default Button