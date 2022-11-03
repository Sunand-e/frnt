import usePageTitle from "../hooks/usePageTitle";
import Categories from '../components/categories/Categories';
import { gql, useQuery } from "@apollo/client";
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
