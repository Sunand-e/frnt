// Core viewer
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker } from '@react-pdf-viewer/core';

const PdfViewer = ({className, url}) => {

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className={className}>
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
      <Viewer
        fileUrl={url}    
        defaultScale={SpecialZoomLevel.PageFit}
        plugins={[
          // Register plugins
          defaultLayoutPluginInstance
        ]}
      />
    </Worker>
    </div>

)}

export default PdfViewer;