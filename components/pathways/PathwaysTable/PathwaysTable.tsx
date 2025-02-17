import { useEffect } from "react";
import useGetPathways from "../../../hooks/pathways/useGetPathways";
import PathwayActionsMenu from "./PathwayActionsMenu";
import ContentTable from "../../common/tables/ContentTable";
import { contentTypes } from "../../common/contentTypes";
import { useViewStore } from "../../../hooks/useViewStore";

const PathwaysTable = () => {
  const { pathways, loading, error, loadMore, hasMore } = useGetPathways();
  const type = contentTypes["pathway"];
  const scrollableRef = useViewStore((state) => state.mainScrollableRef);

  useEffect(() => {
    if (!scrollableRef.current) {
      return;
    }

    const handleScroll = () => {
      if (
        scrollableRef.current.scrollTop + scrollableRef.current.clientHeight >=
        scrollableRef.current.scrollHeight - 10
      ) {
        loadMore();
      }
    };

    scrollableRef.current.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollableRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollableRef, loadMore, hasMore]);

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
