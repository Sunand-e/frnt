import useGetPathways from "../../../hooks/pathways/useGetPathways";
import PathwayActionsMenu from "./PathwayActionsMenu";
import ContentTable from "../../common/tables/ContentTable";
import { contentTypes } from "../../common/contentTypes";

const PathwaysTable = () => {
  const { pathways, loading, error } = useGetPathways();
  const type = contentTypes["pathway"];

  return (
    <ContentTable
      content={pathways}
      type={type}
      loading={loading}
      error={error}
      ActionsMenuComponent={PathwayActionsMenu}
      tableProps={{
        filters: ["global"],
      }}
    />
  );
};

export default PathwaysTable;