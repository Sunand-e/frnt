import { PDFViewer, usePDF } from "@react-pdf/renderer";
import { useContext } from "react";
import { TenantContext } from "../../context/TenantContext";
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser";
import { handleModal } from "../../stores/modalStore";
import CertificatePdf from "./CertificatePdf";

const CertificateLink = ({certificate}) => {
  
  const tenant = useContext(TenantContext)
  const {user} = useGetCurrentUser()

  const pdfContent = <CertificatePdf
    user={user}
    certificate={certificate}
    colors={{
    primary: tenant.primaryBrandColor || '#555555',
    secondary: tenant.secondaryBrandColor || '#222222',
  }} />

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