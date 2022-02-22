import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const GridLayout = ({layout, children}) => {
  return (
    <ReactGridLayout
      className="layout relative"
      layout={layout}
      cols={12}
      rowHeight={20}
      width={1200}
    >
      {children.map(child => (
        <div key={child.key} className={`p-3`}>{child}</div>
      ))}
    </ReactGridLayout>
  );
}

export default GridLayout