const GlobalFilter = ({
  globalFilter, 
  setGlobalFilter
}) => (
  <div>
    <input
      value={globalFilter ?? ''}
      onChange={e => setGlobalFilter(e.target.value)}
      className="p-2 font-lg shadow border border-block"
      placeholder="Search all columns..."
    />
  </div>
)

export default GlobalFilter