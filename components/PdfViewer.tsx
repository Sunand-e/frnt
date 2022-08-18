// Core viewer
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker } from '@react-pdf-viewer/core';

const PdfViewer = ({url}) => {

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div style={{ height: '600px' }}>
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.js">
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