import { GetCoursesQuery } from "../../graphql/generated";

export const course1: NonNullable<NonNullable<GetCoursesQuery['courses']['edges']>[number]> = {
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
    enrolmentsRemaining: 0,
    creditsUsed: 1,
    image: null,
    icon: null,
    __typename: "ContentItem",
    tags: {
      edges: [
        {
          order: 2,
          contentItemId: "fe99d055-3736-46dd-a498-f9e12cc31362",
          __typename: "ContentItemTagEdge",
          node: {
            id: "9f0fa9e8-fd05-404a-9c16-bad335a721ea",
            label: "Health and Safety",
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
};

export const course2: NonNullable<NonNullable<GetCoursesQuery['courses']['edges']>[number]> = {
  userId: "08b47ece-f950-475d-86dc-a436350bd74e",
  status: null,
  lastVisited: null,
  completedAt: null,
  passedAt: null,
  progress: null,
  properties: {},
  __typename: "UserContentEdge",
  node: {
    id: "005ca28a-52c2-49f5-a7dd-738a8da6ecae",
    title: "Struggling with Impostor Syndrome",
    order: 784,
    content: {},
    contentType: null,
    itemType: "course",
    shared: false,
    prerequisites: {},
    settings: {
      isScored: false,
      frontPage: {
        enabled: false,
        overlayColor: "rgba(0,0,0,0.5)"
      },
      certificate: {
        enabled: true
      },
      showSendFeedbackButton: false
    },
    createdAt: "2024-03-06T10:56:40Z",
    updatedAt: "2025-01-08T22:12:36Z",
    enrolmentsRemaining: 0,
    creditsUsed: 0,
    image: {
      location: "/images/logo-color.png",
      id: "d67ee092-c5d1-4688-a354-467ec70b7b16",
      altText: "Test alt text",
      properties: null,
      title: null,
      fileName: "Imposter-syndrome.jpg",
      __typename: "MediaItem"
    },
    icon: null,
    __typename: "ContentItem",
    tags: {
      edges: [
        {
          order: 4,
          contentItemId: "005ca28a-52c2-49f5-a7dd-738a8da6ecae",
          __typename: "ContentItemTagEdge",
          node: {
            id: "05fc4d64-5efe-498a-961b-ca933c59d805",
            label: "Health \u0026 Wellbeing",
            tagType: "category",
            __typename: "Tag"
          }
        }
      ],
      __typename: "ContentItemTagConnection"
    },
    users: {
      totalCount: 2,
      __typename: "ContentUserConnection"
    },
    _deleted: false,
    _isOptimistic: false,
  }
};

export const course3: NonNullable<NonNullable<GetCoursesQuery['courses']['edges']>[number]> = {
  userId: "353db5e2-d538-4ebb-93ad-3ed2f52a589c",
  status: null,
  lastVisited: null,
  completedAt: null,
  passedAt: null,
  progress: null,
  properties: {},
  __typename: "UserContentEdge",
  node: {
    id: "0215f462-c5aa-463f-bbed-a45bd602650a",
    title: "Control of Substances Hazardous to Health (COSHH) (Legacy)",
    order: 236,
    content: {
      description: {
        description: "\u003cp\u003eThe aim of this course is to provide the learner with an awareness of the dangers associated with hazardous substances and the knowledge to prevent harm to health by the use of risk assessments and control measures when working with hazardous substances.\u003c/p\u003e"
      }
    },
    contentType: null,
    itemType: "course",
    shared: false,
    prerequisites: {},
    settings: {
      isScored: true,
      frontPage: {
        overlayColor: "rgba(0,0,0,0.5)"
      },
      certificate: {
        enabled: true
      },
      scoreFromModuleIds: [
        "13dc653d-73a5-4f81-afdf-4dd31ef0816a"
      ]
    },
    createdAt: "2022-09-28T15:10:11Z",
    updatedAt: "2025-01-08T22:12:36Z",
    enrolmentsRemaining: 0,
    creditsUsed: 0,
    image: {
      location: "/images/download.jpg",
      id: "ceb40855-28e6-479d-8dd9-01719f7b08ee",
      altText: "Test alt text",
      properties: null,
      title: null,
      fileName: "COSHH.jpg",
      __typename: "MediaItem"
    },
    icon: null,
    __typename: "ContentItem",
    tags: {
      edges: [
        {
          order: 7,
          contentItemId: "0215f462-c5aa-463f-bbed-a45bd602650a",
          __typename: "ContentItemTagEdge",
          node: {
            id: "9f0fa9e8-fd05-404a-9c16-bad335a721ea",
            label: "Health and Safety",
            tagType: "category",
            __typename: "Tag"
          }
        }
      ],
      __typename: "ContentItemTagConnection"
    },
    users: {
      totalCount: 2,
      __typename: "ContentUserConnection"
    },
    _deleted: false,
    _isOptimistic: false,
  }
};

export const coursesResponse: GetCoursesQuery = {
  courses: {
    totalCount: 3,
    notStartedCount: 3,
    inProgressCount: 0,
    completedCount: 0,
    edges: [
      course1,
      course2,
      course3
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

export const courseEmptyResponse: GetCoursesQuery = {
  courses: {
    edges: [],
    totalCount: 0,
    notStartedCount: 0,
    inProgressCount: 0,
    completedCount: 0,
    pageInfo: {
      __typename: "PageInfo",
      endCursor: null,
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null
    }
  }
};
