import { GetTagsQuery } from "../../graphql/generated";

export const tag1: NonNullable<NonNullable<GetTagsQuery['tags']>[number]> = {
  id: "9f0fa9e8-fd05-404a-9c16-bad335a721ea",
  label: "Health and Safety",
  tagType: "category",
  order: 32,
  settings: {},
  parent: null,
  image: null,
  __typename: "Tag",
  contentItems: {
    totalCount: 20,
    __typename: "TagContentItemConnection"
  },
  _deleted: false
};

export const tag2: NonNullable<NonNullable<GetTagsQuery['tags']>[number]> = {
  id: "05fc4d64-5efe-498a-961b-ca933c59d805",
  label: "Health \u0026 Wellbeing",
  tagType: "category",
  order: 28,
  settings: {
    thumbnailImageFit: "contain"
  },
  parent: null,
  image: {
    location: "",
    id: "16ea419e-f4c3-4dba-8372-4006eef6bbf4",
    altText: "Test alt text",
    properties: null,
    title: null,
    __typename: "MediaItem"
  },
  __typename: "Tag",
  contentItems: {
    totalCount: 10,
    __typename: "TagContentItemConnection"
  },
  _deleted: false
};

export const tag3: NonNullable<NonNullable<GetTagsQuery['tags']>[number]> = {
  id: "49750053-5704-4af2-b68e-91adc843898a",
  label: "Leadership and Management",
  tagType: "category",
  order: 29,
  settings: {
    thumbnailImageFit: "contain"
  },
  parent: null,
  image: {
    location: "",
    id: "b1187336-5b3d-4dab-8097-89a2e3b19028",
    altText: "Test alt text",
    properties: null,
    title: null,
    __typename: "MediaItem"
  },
  __typename: "Tag",
  contentItems: {
    totalCount: 11,
    __typename: "TagContentItemConnection"
  },
  _deleted: false
};

export const tagsResponse: GetTagsQuery = {
  tags: [
    tag1,
    tag2,
    tag3,
    {
      id: "b57f9136-6559-4f07-b0ad-5d9c82352764",
      label: "Inspiring Great",
      tagType: "category",
      order: 31,
      settings: {
        thumbnailImageFit: "contain"
      },
      parent: null,
      image: {
        location: "",
        id: "b2120f51-135c-4e3c-be1a-e646c437529f",
        altText: "Test alt text",
        properties: null,
        title: null,
        __typename: "MediaItem"
      },
      __typename: "Tag",
      contentItems: {
        totalCount: 5,
        __typename: "TagContentItemConnection"
      },
      _deleted: false
    },
    {
      id: "a63413db-065e-4edd-807c-66846c1d73c7",
      label: "Personal Development",
      tagType: "category",
      order: 23,
      settings: {
        thumbnailImageFit: "contain"
      },
      parent: null,
      image: {
        location: "",
        id: "9d63f60e-069f-42ab-9b63-4f1cf3ee05a5",
        altText: "Test alt text",
        properties: null,
        title: null,
        __typename: "MediaItem"
      },
      __typename: "Tag",
      contentItems: {
        totalCount: 11,
        __typename: "TagContentItemConnection"
      },
      _deleted: false
    }
  ]
};