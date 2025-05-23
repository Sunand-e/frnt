
import classNames from '../../utils/classNames';
import styles from './Button.module.scss'

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset"
  size?: "sm" | "md" | "lg"
  children: JSX.Element | string | Array<JSX.Element | string>,
  className?: string
  displayType?: string
  disabled?: boolean
}

const Button = ({ref, onClick, disabled=false, type="button", displayType="normal", size, className, children}: ButtonProps) => {
  let spanClass, bgColorClass
  switch(displayType) {
    case 'alert': {
      spanClass = 'text-white'
      bgColorClass = 'bg-red-800 group-hover:bg-red-700 transition-colors duration-1000'
      break;
    }
    case 'white': {
      spanClass = 'text-main'
      bgColorClass = 'bg-white group-hover:bg-main-lightness-95 text-main transition-colors duration-1000'
      break;
    }
    default: {
      spanClass = 'text-white'
      bgColorClass = 'bg-main group-hover:bg-opacity-80 transition-colors duration-1000'
      break;
    }
  }
  
  return (
    <button 
      ref={ref}
      type={type}
      disabled={disabled}
      className={classNames(
        className,
        styles.button,
        styles.button_bestia,
        size === 'sm' ? 'px-1' : 'px-8',
        `min-w-16 py-2 
        whitespace-nowrap nowrap
        border border-transparent rounded-md
        text-sm
        group
        disabled bg-main
        focus:bg-opacity-50 focus:outline-none 
        active:bg-opacity-50 
        `
      )}
      onClick={onClick}
    >
      <div className={classNames(styles.button__bg, bgColorClass)}></div>
      <span className={classNames(styles.button__span, spanClass)}>{children}</span>
    </button>
  )
}
export default Button