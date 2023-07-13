import styles from './MenuItem.module.scss'

import React from 'react'
import remixiconUrl from './remixicon.symbol.svg'

export default ({
  icon, title, action, isActive = null,
}) => (
  <button
    className={`${styles['menu-item']} text-main-secondary hover:text-white hover:bg-main-secondary active:text-white active:bg-main-secondary  ${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    <svg className="remix w-6">
      <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
    </svg>
  </button>
)