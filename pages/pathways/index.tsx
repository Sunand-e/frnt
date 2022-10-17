import PathwayTabs from "../../components/pathways/PathwayTabs";
import usePageTitle from "../../hooks/usePageTitle";

const PathwaysPage = () => {
  
  usePageTitle({ title: 'Pathways' })

  return (
    <>
      <PathwayTabs />
    </>
  );
}

PathwaysPage.navState = {
  topLevel: 'pathways',
  // secondary: 'pathways'
}

export default PathwaysPage
