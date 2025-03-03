import dayjs from "dayjs"
import TooltipIfClamped from "../components/common/floating-ui/TooltipIfClamped"
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

export const noDataDash = <span>&mdash;</span>

const dateAccessorFnAndCell = (accessorKey: string) => {
  return {
    accessorFn: row => (
      row[accessorKey] ? dayjs(row[accessorKey]).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    cell: (cell) => <TooltipIfClamped className="line-clamp-2">{cell.getValue()}</TooltipIfClamped> || noDataDash
  }
}
export const commonTableCols = {
  createdAt: {
    id: "createdAt",
    header: "Created at",
    ...dateAccessorFnAndCell('createdAt')
  },
  
  updatedAt: {
    id: "updatedAt",
    header: "Updated at",
    ...dateAccessorFnAndCell('updatedAt')
  },
  
  firstVisited: {
    id: "firstVisited",
    header: "First access",
    ...dateAccessorFnAndCell('firstVisited')
  },
  
  lastVisited: {
    id: "lastVisited",
    header: "Last visited",
    ...dateAccessorFnAndCell('lastVisited')
  },
  
  passedAt: {
    id: "passedAt",
    header: "Passed at",
    ...dateAccessorFnAndCell('passedAt')
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
  actions: {
    id: "actions",
    header: "Actions",
    accessorKey: "actions",
    enableSorting: false,
    hideOnCsv: true
  }
}