/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateEvent
// ====================================================

export interface UpdateEvent_updateEvent_event_physicalEvent {
  __typename: "PhysicalEvent";
  location: any | null;
}

export interface UpdateEvent_updateEvent_event_virtualEvent {
  __typename: "VirtualEvent";
  provider: string | null;
}

export interface UpdateEvent_updateEvent_event {
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
  physicalEvent: UpdateEvent_updateEvent_event_physicalEvent | null;
  virtualEvent: UpdateEvent_updateEvent_event_virtualEvent | null;
  _deleted: boolean;
}

export interface UpdateEvent_updateEvent {
  __typename: "UpdateEventPayload";
  event: UpdateEvent_updateEvent_event;
}

export interface UpdateEvent {
  updateEvent: UpdateEvent_updateEvent | null;
}

export interface UpdateEventVariables {
  id: string;
  title?: string | null;
  location?: any | null;
  provider?: string | null;
}
