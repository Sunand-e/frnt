import styles from './LoadingSpinner.module.scss'
export default function LoadingSpinner({text, className}) {

  return (
    <div className={`${className} display flex-col text-center text-main-secondary mx-auto`}>
      { text }
      <div className={styles.loadingCubeGrid}>
        {[...Array(9)].map((x, i) =>
          <div key={i} className={`${styles.loadingCube} ${styles['loadingCube1']} ${styles[`loadingCube${i+1}`]} bg-main-secondary`}></div>
        )}
      </div>
    </div>
  )
}
