import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const GridLayout = ({layout, children}) => {
  
  const handleLayoutChange = layout => {
    // prompt('y',JSON.stringify(layout,null,2))
  }

  return (
    <ReactGridLayout
      onLayoutChange={handleLayoutChange}
      className="layout relative"
      containerPadding={[0,0]}
      margin={[30,30]}
      layout={layout}
      cols={12}
      rowHeight={20}
      width={1200}
    >
      {children.map(child => (
        <div key={child.key} className={`p-4 bg-white shadow-xl rounded-2xl overflow-hidden`}>{child}</div>
      ))}
    </ReactGridLayout>
  );
}

export default GridLayout