export interface PageInfo {
    endCursor: string | null;
    hasNextPage: boolean;
  }
  
  export interface ReportNode {
    completedCourseCount: number;
    userCount: number;
    groupCount: number;
    courseCount: number;
    tags: { edges: { node: { id: string } }[] };
  }
  
  export interface GetReportsResponse {
    reports: {
      edges: { node: ReportNode }[];
      pageInfo: PageInfo;
    };
  }
  