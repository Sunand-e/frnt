var tslib = require("tslib");
import { mergeDeep } from "@apollo/client/utilities";

var getExtras = function (obj) { 
  const { edges, pageInfo, ...extras } = obj
  return extras
}
function makeEmptyData() {
  return {
      edges: [],
      pageInfo: {
          hasPreviousPage: false,
          hasNextPage: true,
          startCursor: "",
          endCursor: "",
      },
  };
}


export function customPagination(keyArgs) {
  if (keyArgs === void 0) { keyArgs = false; }
  return {
      keyArgs: keyArgs,
      read: function (existing, { canRead, readField }) {
        if (!existing) {
          return existing;
        }
      
        const { edges, pageInfo = {}, ...extras } = existing;
        const processedEdges = [];
        let firstEdgeCursor = "";
        let lastEdgeCursor = "";
      
        edges.forEach(function (edge) {
          if (canRead(readField("node", edge))) {
            processedEdges.push(edge);
            if (edge.cursor) {
              firstEdgeCursor = firstEdgeCursor || edge.cursor || "";
              lastEdgeCursor = edge.cursor || lastEdgeCursor;
            }
          }
        });
      
        return {
          ...extras,
          edges: processedEdges,
          pageInfo: {
            ...pageInfo,
            startCursor: pageInfo.startCursor || firstEdgeCursor,
            endCursor: pageInfo.endCursor || lastEdgeCursor,
          },
        };
      },
      merge: function (existing, incoming, _a) {
          var args = _a.args, isReference = _a.isReference, readField = _a.readField;
          if (!existing) {
              existing = makeEmptyData();
          }
          if (!incoming) {
              return existing;
          }
          var incomingEdges = incoming.edges ? incoming.edges.map(function (edge) {
              if (isReference(edge = { ...edge })) {
                  edge.cursor = readField("cursor", edge);
              }
              return edge;
          }) : [];
          if (incoming.pageInfo) {
              var pageInfo_1 = incoming.pageInfo;
              var startCursor = pageInfo_1.startCursor, endCursor = pageInfo_1.endCursor;
              var firstEdge = incomingEdges[0];
              var lastEdge = incomingEdges[incomingEdges.length - 1];
              if (firstEdge && startCursor) {
                  firstEdge.cursor = startCursor;
              }
              if (lastEdge && endCursor) {
                  lastEdge.cursor = endCursor;
              }
              var firstCursor = firstEdge && firstEdge.cursor;
              if (firstCursor && !startCursor) {
                  incoming = mergeDeep(incoming, {
                      pageInfo: {
                          startCursor: firstCursor,
                      },
                  });
              }
              var lastCursor = lastEdge && lastEdge.cursor;
              if (lastCursor && !endCursor) {
                  incoming = mergeDeep(incoming, {
                      pageInfo: {
                          endCursor: lastCursor,
                      },
                  });
              }
          }
          var prefix = existing.edges;
          var suffix = [];
          if (args && args.after) {
              var index = prefix.findIndex(function (edge) { return edge.cursor === args.after; });
              if (index >= 0) {
                  prefix = prefix.slice(0, index + 1);
              }
          }
          else if (args && args.before) {
              var index = prefix.findIndex(function (edge) { return edge.cursor === args.before; });
              suffix = index < 0 ? prefix : prefix.slice(index);
              prefix = [];
          }
          else if (incoming.edges) {
              prefix = [];
          }
          var edges = [...prefix, ...incomingEdges, suffix]
          var pageInfo = { ...incoming.pageInfo, ...existing.pageInfo }
          if (incoming.pageInfo) {
              const { hasPreviousPage, hasNextPage, startCursor, endCursor, ...extras } = incoming.pageInfo
              Object.assign(pageInfo, extras);
              if (!prefix.length) {
                  if (void 0 !== hasPreviousPage)
                      pageInfo.hasPreviousPage = hasPreviousPage;
                  if (void 0 !== startCursor)
                      pageInfo.startCursor = startCursor;
              }
              if (!suffix.length) {
                  if (void 0 !== hasNextPage)
                      pageInfo.hasNextPage = hasNextPage;
                  if (void 0 !== endCursor)
                      pageInfo.endCursor = endCursor;
              }
          }
          return {
            ...getExtras(existing), ...getExtras(incoming), edges, pageInfo
          }   
      }
  };
}