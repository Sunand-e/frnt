import styles from './MenuItem.module.scss'

import React from 'react'
import remixiconUrl from './remixicon.symbol.svg'
import Tippy from '@tippyjs/react'

export default ({
  icon, title, action, isActive = null,
}) => (
  <Tippy content={<strong>{title}</strong>} theme="memberhub-white">
    <button
      className={`${styles['menu-item']} text-main-secondary hover:text-white hover:bg-main-secondary active:text-white active:bg-main-secondary  ${isActive && isActive() ? 'bg-main-secondary/30 is-active' : ''}`}
      onClick={action}
      // title={title}
    >
      <svg className="remix w-6">
        <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
      </svg>
    </button>
  </Tippy>
)