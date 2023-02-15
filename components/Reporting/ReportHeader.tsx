import React, { useMemo, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Dot } from "../common/misc/Dot";
import Button from "../common/Button";
import exportToCsv from "../../utils/exportToCsv";
import { useTable, useSortBy } from "react-table";
import TableStructure from "../common/tables/TableStructure";
import { useRouter } from "../../utils/router";
import { client } from "../../graphql/client";
import { gql } from "@apollo/client";
import ReportFilters from "./ReportFilters";

const ConditionalHeaderWrapper = ({simple, children}) => (
  <>
    { !simple ? (
      <div className="mb-4 bg-white shadow rounded-md p-6">
        { children }   
      </div>
    ) : <>{ children }</> }
  </>
)

const ReportHeader = ({
  simple=false,
  title
}) => {
  // const [categoryId, setCategoryId] = useState(null);
  // const [groupId, setGroupId] = useState(null);
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994

  const router = useRouter()

  const { 
    user: userId, 
    group: groupId, 
    course: courseId, 
    lesson: lessonId, 
    category: categoryId,
    type: type
  } = router.query

  return (
    <ConditionalHeaderWrapper simple={simple}>
      <h3 className="text-main-secondary font-semibold text-center mb-3 sm:text-left">
        {title}
      </h3>
    </ ConditionalHeaderWrapper>
  )
};

export default ReportHeader;
