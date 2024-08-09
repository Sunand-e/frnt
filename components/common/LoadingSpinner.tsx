import { CSSProperties, ReactNode } from 'react';
import classNames from '../../utils/classNames';
import styles from './LoadingSpinner.module.scss';
import BlinkingEllipsis from './misc/BlinkingEllipsis';

interface LoadingSpinnerProps {
  text?: ReactNode
  className?: string
  size?: string
  textPosition?: string
  showSpinner?: boolean
}

export default function LoadingSpinner({text, className, size='lg', textPosition='top', showSpinner=true}: LoadingSpinnerProps): JSX.Element {

  let sizeModifier = 4
  switch(size) {
    case 'xs':
      sizeModifier = 1
      break;
    case 'sm':
      sizeModifier = 2
      break;
    case 'md':
      sizeModifier = 3
      break;
    case 'lg':
      sizeModifier = 4
      break;
  }

  const cubeStyle: CSSProperties = {
    margin: sizeModifier
  }

  const gridStyle = {
    width: 20 * sizeModifier,
    height: 20 * sizeModifier
  }

  const textPositionClasses = ['left','right'].includes(textPosition) ? 'space-x-3' : 'space-y-3 flex-col'

  const textWithEllipsis = <span>{text}<BlinkingEllipsis /></span>

  return (
    <div className={classNames(
      className,
      'display flex text-center items-center justify-center text-gray-900 mx-auto',
      textPositionClasses
    )}>
      { !!text && ['left', 'top'].includes(textPosition) && textWithEllipsis }
      { showSpinner && (
        <div className={styles.loadingCubeGrid} style={gridStyle}>
          {[...Array(9)].map((x, i) =>
            <div 
              key={i} 
              className={classNames(
                styles.loadingCube,
                styles[`loadingCube${i+1}`],
                'bg-main-secondary'
              )}
              style={cubeStyle}
            ></div>
          )}
        </div>
      )}
      { !!text && ['right', 'bottom'].includes(textPosition) && textWithEllipsis }
    </div>
  )
}
