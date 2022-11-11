import dayjs from "dayjs"
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const noDataDash = <span>&mdash;</span>

export const commonTableCols = {
  createdAt: {
    id: "createdAt",
    Header: "First access",
    accessor: (row) => (
      row.createdAt ? dayjs(row.createdAt).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    Cell: (cell) => cell.value || noDataDash
  },
  
  updatedAt: {
    id: "updatedAt",
    Header: "Last visited",
    accessor: (row) => (
      row.updatedAt ? dayjs(row.updatedAt).format('Do MMMM YYYY [at] h:mm A') : null
    ),
    Cell: (cell) => cell.value || noDataDash
  },
}