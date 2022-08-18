/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_events_edges_node_physicalEvent {
  __typename: "PhysicalEvent";
  location: any | null;
}

export interface GetEvents_events_edges_node_virtualEvent {
  __typename: "VirtualEvent";
  provider: string | null;
}

export interface GetEvents_events_edges_node {
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
  physicalEvent: GetEvents_events_edges_node_physicalEvent | null;
  virtualEvent: GetEvents_events_edges_node_virtualEvent | null;
  _deleted: boolean;
}

export interface GetEvents_events_edges {
  __typename: "EventEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetEvents_events_edges_node | null;
}

export interface GetEvents_events {
  __typename: "EventConnection";
  /**
   * A list of edges.
   */
  edges: (GetEvents_events_edges | null)[] | null;
}

export interface GetEvents {
  events: GetEvents_events;
}
