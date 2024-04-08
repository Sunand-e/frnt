import { PDFViewer, usePDF } from "@react-pdf/renderer";
import { useContext } from "react";
import { TenantContext } from "../../context/TenantContext";
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser";
import { handleModal } from "../../stores/modalStore";
import Button from "../common/Button";
import CertificatePdf from "./CertificatePdf";

const CertificateActionsCell = ({cell}) => {
  
  const tenant = useContext(TenantContext)
  const {user} = useGetCurrentUser()

  const certificate = cell.row.original

  const pdfContent = <CertificatePdf
    user={user}
    certificate={certificate}
    tenant={tenant}
  />

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
          <Button onClick={handleClick}>
            View certificate
          </Button>
        </>
      )}
    </div>
  )
}

export default CertificateActionsCell