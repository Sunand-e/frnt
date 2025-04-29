import { GetCoursesQuery } from "../../graphql/generated";

export const coursesResponse: GetCoursesQuery = {
  courses: {
    totalCount: 1,
    notStartedCount: 1,
    inProgressCount: 0,
    completedCount: 0,
    edges: [
      {
        userId: "08b47ece-f950-475d-86dc-a436350bd74e",
        status: null,
        lastVisited: null,
        completedAt: null,
        passedAt: null,
        progress: null,
        properties: {},
        __typename: "UserContentEdge",
        node: {
          id: "fe99d055-3736-46dd-a498-f9e12cc31362",
          title: "Introduction to Equality, Diversity and Inclusion",
          order: 706,
          content: {
            description: {
              description: {
                description:
                  "<p>The aim of this course is to provide the learner with an awareness of the Equality Act 2010 and the protected characteristics covered under the Act. The key aspects of equality, diversity and inclusion in the workplace. The types and impact of discrimination and harassment.</p>",
              },
            },
          },
          contentType: null,
          itemType: "course",
          shared: false,
          prerequisites: {},
          settings: {
            isScored: true,
            frontPage: {
              overlayColor: "rgba(0,0,0,0.5)",
            },
            certificate: {
              enabled: true,
            },
            scoreFromModuleIds: [
              "56b323eb-49ea-4d7e-ab09-82cf5215b2da",
            ],
          },
          _deleted: false,
          _isOptimistic: false,
          createdAt: "2022-09-28T15:19:42Z",
          updatedAt: "2025-01-17T15:15:28Z",
          enrolmentsRemaining: 1,
          creditsUsed: -1,
          image: {
            location:
              "https://elearningplus.smartlms.co.uk/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWs1TVRZd016ZGxOQzFqWXpFMUxUUmlaamN0WW1NeE15MDRaV0UwTldJNU9UZGxNREFHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--3a41bc33ac7e58bd71e1abc02619736070245bd3/Equality%20and%20Diversity1.jpg",
            id: "8e38fbd5-6423-48a7-87a1-e010c636c318",
            altText: "Test alt text",
            properties: null,
            title: null,
            fileName: "Equality and Diversity1.jpg",
            __typename: "MediaItem",
          },
          icon: null,
          __typename: "ContentItem",
          tags: {
            edges: [
              {
                order: 2,
                contentItemId: "fe99d055-3736-46dd-a498-f9e12cc31362",
                __typename: "ContentItemTagEdge",
                node: {
                  id: "9ee2537a-5435-4312-958c-f6384f7354d2",
                  label: "Equality, Diversity and Inclusion",
                  tagType: "category",
                  __typename: "Tag",
                },
              },
            ],
            __typename: "ContentItemTagConnection",
          },
          users: {
            totalCount: 7,
            __typename: "ContentUserConnection",
          },
        },
      },
    ],
    pageInfo: {
      __typename: "PageInfo",
      endCursor: null,
      hasNextPage: true,
      hasPreviousPage: false,
      startCursor: null,
    }
  },
};
