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
}

export default PathwaysPage
