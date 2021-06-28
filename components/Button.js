import styles from './Button.module.scss'

const Button = ({onClick, children}) => (
  <button className={`${styles.button} focus:bg-opacity-50 focus:outline-none active:bg-opacity-50 h-8 bg-main rounded-full font-base text-base px-8 text-white`} onClick={onClick}>{children}</button>
)
export default Button