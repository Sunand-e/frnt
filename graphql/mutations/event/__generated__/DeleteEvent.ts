/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEvent
// ====================================================

export interface DeleteEvent_deleteEvent_event {
  __typename: "Event";
  id: string;
  _deleted: boolean;
}

export interface DeleteEvent_deleteEvent {
  __typename: "DeleteEventPayload";
  event: DeleteEvent_deleteEvent_event;
  message: string;
}

export interface DeleteEvent {
  deleteEvent: DeleteEvent_deleteEvent | null;
}

export interface DeleteEventVariables {
  id: string;
}
