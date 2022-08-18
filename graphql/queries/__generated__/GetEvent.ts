/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvent
// ====================================================

export interface GetEvent_event_physicalEvent {
  __typename: "PhysicalEvent";
  location: any | null;
}

export interface GetEvent_event_virtualEvent {
  __typename: "VirtualEvent";
  provider: string | null;
}

export interface GetEvent_event {
  __typename: "Event";
  title: string | null;
  content: any | null;
  createdAt: any;
  eventModelType: string | null;
  id: string;
  selfRegistration: boolean | null;
  startTime: any | null;
  updatedAt: any;
  duration: any | null;
  eventModelId: string | null;
  physicalEvent: GetEvent_event_physicalEvent | null;
  virtualEvent: GetEvent_event_virtualEvent | null;
  _deleted: boolean;
}

export interface GetEvent {
  event: GetEvent_event;
}

export interface GetEventVariables {
  id: string;
}
