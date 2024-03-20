import dayjs from "dayjs"
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const noDataDash = <span>&mdash;</span>

export const commonTableCols = {
  createdAt: {
    id: "createdAt",
    header: "Created at",
    accessorFn: row => (
      row.createdAt ? dayjs(row.createdAt).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    cell: (cell) => cell.getValue() || noDataDash
  },
  
  updatedAt: {
    id: "updatedAt",
    header: "Updated at",
    accessorFn: row => (
      row.updatedAt ? dayjs(row.updatedAt).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    cell: (cell) => cell.getValue() || noDataDash
  },
  
  firstVisited: {
    id: "firstVisited",
    header: "First access",
    accessorFn: row => (
      row.firstVisited ? dayjs(row.firstVisited).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    cell: (cell) => cell.getValue() || noDataDash
  },
  
  lastVisited: {
    id: "lastVisited",
    header: "Last visited",
    accessorFn: row => (
      row.lastVisited ? dayjs(row.lastVisited).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    cell: (cell) => cell.getValue() || noDataDash
  },
  
  passedAt: {
    id: "passedAt",
    header: "Passed at",
    accessorFn: row => (
      row.passedAt ? dayjs(row.passedAt).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    cell: (cell) => cell.getValue() || noDataDash
  },

  status: {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: ({ cell }) => {
      switch(cell.getValue()) {
        case 'in_progress': 
          return 'In progress'
        case 'completed': 
          return 'Completed'
        default:
          return 'Not started'
      }
    }          
  },
  progress: {
    id: "progress",
    header: "Progress",
    accessorKey: "progress",
    cell: ({ cell }) => {
      return (cell.getValue() || '0') + '%'
    }
  },
  score: {
    id: "score",
    header: "Score",
    accessorKey: "score",
    cell: ({ cell }) => {
      return (cell.getValue() || noDataDash)
    }
  },
}