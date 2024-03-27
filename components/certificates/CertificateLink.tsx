import { PDFViewer, usePDF } from "@react-pdf/renderer";
import { useContext, useMemo } from "react";
import { TenantContext } from "../../context/TenantContext";
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser";
import { handleModal } from "../../stores/modalStore";
import CertificatePdf from "./CertificatePdf";

const CertificateLink = ({certificate}) => {
  
  const {user} = useGetCurrentUser()
  
  const tenant = useContext(TenantContext)
  
  const pdfContent = tenant && <CertificatePdf
    user={user}
    certificate={certificate}
    tenant={tenant}
  />

  // const [instance, updateInstance] = usePDF({ document: pdfContent });

  const handleClick = () => {
      handleModal({
        size: 'lg',
        content: (
          <PDFViewer className={"w-full aspect-video"}>
            {pdfContent}
          </PDFViewer>
        )
      })
  };

  return (
    <div>
      {user && (
        <>
          <h3 onClick={handleClick}>
            {certificate.course.title || `Untitled ${certificate.course.itemType}`}
          </h3>
        </>
      )}
    </div>
  )
}

export default CertificateLink