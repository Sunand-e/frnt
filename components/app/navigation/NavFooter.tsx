import SettingsMenuAndButton from './SettingsMenuAndButton';

const NavFooter = ({children=null, isSlim}) => {

  return (
      <div id="navFooter" className={`z-50 static flex bottom-0 overflow-visible transition-width ${isSlim ? 'w-16' : 'w-60'}`}>
        {children}
        <SettingsMenuAndButton />
      </div>
  )
}
export default NavFooter
