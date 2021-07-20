import styles from './Button.module.scss'

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element | string
}

const Button = ({onClick, children}: ButtonProps) => (
  <button className={`${styles.button} nowrap focus:bg-opacity-50 min-w-16 focus:outline-none active:bg-opacity-50 h-8 bg-main rounded-full font-base text-base px-8 text-white`} onClick={onClick}>{children}</button>
)
export default Button