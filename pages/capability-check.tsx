import usePageTitle from "../hooks/usePageTitle";
import CapabilitiesTable from "../components/roles/CapabilitiesTable";

const CapabilityCheckPage = () => {

  usePageTitle({ title: 'Capability Check' })
  
  return (
    <CapabilitiesTable />
  )
}

CapabilityCheckPage.navState = {
  topLevel: 'dashboard',
}

export default CapabilityCheckPage
