import styles from './LoadingSpinner.module.scss'

interface LoadingSpinnerProps {
  text?: string,
  className?: string
}

export default function LoadingSpinner({text, className}: LoadingSpinnerProps): JSX.Element {

  return (
    <div className={`${className} display flex-col text-center text-main-dark mx-auto`}>
      { text }
      <div className={styles.loadingCubeGrid}>
        {[...Array(9)].map((x, i) =>
          <div key={i} className={`${styles.loadingCube} ${styles['loadingCube1']} ${styles[`loadingCube${i+1}`]} bg-blue-dark`}></div>
        )}
      </div>
    </div>
  )
}