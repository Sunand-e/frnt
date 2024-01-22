import { PDFViewer, usePDF } from '@react-pdf/renderer';
import Head from 'next/head';
import { useContext } from 'react';
import CertificatePdf from '../components/certificates/CertificatePdf';
import Button from '../components/common/Button';
import { TenantContext } from '../context/TenantContext';
import usePageTitle from '../hooks/usePageTitle';
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardPage = () => {

  usePageTitle({title: "Pdf"})

  const tenant = useContext(TenantContext)

  const pdfContent = <CertificatePdf colors={{
    // primary: tenant.primaryBrandColor || '#555555',
    // secondary: tenant.secondaryBrandColor || '#222222',
    primary: tenant.primaryBrandColor || '#555555',
    secondary: tenant.secondaryBrandColor || '#222222',
  }} />

  const [instance, updateInstance] = usePDF({ document: pdfContent });

  const handleClick = async () => {
    const url = URL.createObjectURL(instance.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Certificate.pdf';
    link.click();
  };

  return (
    <>
      <Head>
        <title>Zanda360</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col align-center py-12'>
        <Button onClick={handleClick}>Download!</Button>
        <PDFViewer height={800}>
          {pdfContent}
        </PDFViewer>
      </div>
    </>
  )
}

DashboardPage.navState = {
  topLevel: 'dashboard',
  // secondary: 'dashboard'
}

DashboardPage.getLayout = page => (
  <DashboardLayout
    navState={DashboardPage.navState || {}}
    page={page}
  />
)

export default DashboardPage