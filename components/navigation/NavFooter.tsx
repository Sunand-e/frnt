import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react';
import { isLoggedInVar, viewVar } from '../../graphql/cache';
import { useReactiveVar } from '@apollo/client';
import { LogoutIcon } from '@heroicons/react/outline';
import useLogout from '../../hooks/useLogout';
import { applyTheme } from '../../themes/utils';
import baseTheme from '../../themes/base';
import darkTheme from '../../themes/dark';
import SettingsMenuAndButton from './SettingsMenuAndButton';

const NavFooter = ({children=null, isSlim}) => {

  return (
      <div id="navFooter" className={`fixed bottom-0 overflow-visible transition-width ${isSlim ? 'w-16' : 'w-60'}`}>
        {children}
        <SettingsMenuAndButton />
      </div>
  )
}
export default NavFooter
