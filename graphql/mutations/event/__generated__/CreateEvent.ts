/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateEvent
// ====================================================

export interface CreateEvent_createEvent_event_physicalEvent {
  __typename: "PhysicalEvent";
  location: any | null;
}

export interface CreateEvent_createEvent_event_virtualEvent {
  __typename: "VirtualEvent";
  provider: string | null;
}

export interface CreateEvent_createEvent_event {
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
  physicalEvent: CreateEvent_createEvent_event_physicalEvent | null;
  virtualEvent: CreateEvent_createEvent_event_virtualEvent | null;
  _deleted: boolean;
}

export interface CreateEvent_createEvent {
  __typename: "CreateEventPayload";
  event: CreateEvent_createEvent_event;
}

export interface CreateEvent {
  createEvent: CreateEvent_createEvent | null;
}

export interface CreateEventVariables {
  title: string;
  eventModelType: string;
  location?: any | null;
  provider?: string | null;
}
