import BoxContainer from "../../common/containers/BoxContainer";
import TagContentTable from "./TagContentTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import AddTagToContent from "../content/AddTagToContent";
import { handleModal } from "../../../stores/modalStore";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Dot } from '../../common/misc/Dot';
import { useMemo } from "react";

const TagContent = ({tag, contentType, content}) => {
  
  const button = {
    text: `Add ${contentType.name}`,
    onClick: () => {
      handleModal({
        title: `Add ${contentType.plural} to category`,
        content: <AddTagToContent tag={tag} content={content} typeName={contentType.name} />
      })
    }
  }
  
  const getContentTagEdge = (contentEdge) => {
    return contentEdge.node.tags.edges.find(({node}) => node.id === tag.id)
  }
    // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const data = useMemo(
    () => {
      return content?.edges.filter(edge => {
        return (
        !edge.node._deleted
         && getContentTagEdge(edge)
        )
      }).sort((a,b) => getContentTagEdge(b).order - getContentTagEdge(a).order) || []
    },
    [tag,content]
  );

  return (
    <BoxContainer title={`${contentType.label}s`} icon={GraduationCap} button={button}>
      { !data ?
        <LoadingSpinner
          size="xs"
          textPosition="right"
          className="m-6"
          text={(
          <>
            Loading {contentType.plural}
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </>
        )} /> : data.length ? (
          <TagContentTable data={data} tag={tag} contentType={contentType} />
        ) : <p className="m-6 text-center">No {contentType.plural} found</p>
      }
    </BoxContainer>
  );
}

export default TagContent