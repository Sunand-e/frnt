/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EventFragment
// ====================================================

export interface EventFragment_physicalEvent {
  __typename: "PhysicalEvent";
  location: string | null;
}

export interface EventFragment_virtualEvent {
  __typename: "VirtualEvent";
  provider: string | null;
}

export interface EventFragment {
  __typename: "Event";
  content: any | null;
  createdAt: any;
  eventModelType: string | null;
  id: string;
  selfRegistration: boolean | null;
  startTime: any | null;
  updatedAt: any;
  duration: any | null;
  eventModelId: string | null;
  physicalEvent: EventFragment_physicalEvent | null;
  virtualEvent: EventFragment_virtualEvent | null;
  _deleted: boolean;
}
