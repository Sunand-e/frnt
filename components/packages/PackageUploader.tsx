import { GET_SCORM_PACKAGES } from "../../graphql/queries/scormPackages";
import FileUploader from "../common/FileUploader";

const PackageUploader = () => {

  const refetchQuery = GET_SCORM_PACKAGES;
  const endpoint = "/uploads/upload_scorm";
  
  // SCORM 1.2 Specification Notice
  const dropZoneContent = (
    <p>
      Drag and drop a SCORM 1.2 zip archive here, or click this box to select from your computer.
      <br />
      <small>Note: Only SCORM 1.2 packages are supported.</small>
    </p>
  );

  // Accepted MIME types for zip files
  const accept = {
    'application/zip': ['.zip'],
    'application/x-zip-compressed': ['.zip'],
    'multipart/x-zip': ['.zip'],
  };

  const fileParameterName = 'document';
  
  // Pass SCORM 1.2 indication as additional parameters
  const additionalParams = {
    content_type: 'scorm',
    scorm_version: '1.2',  // Explicitly specify SCORM 1.2 version
  };

  return (
    <FileUploader
      refetchQueries={[refetchQuery]}
      fileParameterName={fileParameterName}
      endpoint={endpoint}
      accept={accept}
      dropZoneContent={dropZoneContent}
      additionalParams={additionalParams}
    />
  );
};

export default PackageUploader;
