import useGetCertificates from "../../hooks/certificates/useGetCertificates"
import CertificateLink from "./CertificateLink"

const MyCertificates = () => {
  const { certificates } = useGetCertificates()
  console.log('certificates')
  console.log(certificates)
  return (
    <div>
      { certificates ? certificates.edges.map(certificate => (
        <CertificateLink key={Math.random()} certificate={certificate}/>
      )) : (
        <p className="text-lg mt-12 text-center">You do not have any certificates available.</p>
      )}
    </div>
  )
}

export default MyCertificates