import {Zoom, MicrosoftTeams} from '@styled-icons/boxicons-logos'

const providers = {
  zoom: {
    name: 'Zoom',
    logo: () => <span className='text-[#2D8CFF]'><Zoom /></span>
  },
  teams: {
    name: 'Teams',
    logo: () => <span className='text-[#6264a7]'><MicrosoftTeams /></span>
  },
  webex: {
    name: 'Webex',
    logo: () => <img src="/images/icons/webex-logo.png" />
  },
}

export default providers