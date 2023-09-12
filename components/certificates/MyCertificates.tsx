import useGetCertificates from "../../hooks/certificates/useGetCertificates"
import CertificateLink from "./CertificateLink"

const MyCertificates = () => {
  const { certificates } = useGetCertificates()
  return (
    <div>
      { certificates ? certificates.map(certificate => (
        <CertificateLink key={Math.random()} certificate={certificate}/>
      )) : (
        <p className="text-lg mt-12 text-center">You do not have any certificates available.</p>
      )}
    </div>
  )
}

export default MyCertificates