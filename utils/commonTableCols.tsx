import dayjs from "dayjs"
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const noDataDash = <span>&mdash;</span>

export const commonTableCols = {
  createdAt: {
    id: "createdAt",
    header: "First access",
    accessorFn: row => (
      row.createdAt ? dayjs(row.createdAt).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    cell: (cell) => cell.getValue() || noDataDash
  },
  
  updatedAt: {
    id: "updatedAt",
    header: "Last visited",
    accessorFn: row => (
      row.updatedAt ? dayjs(row.updatedAt).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    cell: (cell) => cell.getValue() || noDataDash
  },
}