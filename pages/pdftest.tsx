import Head from 'next/head'
import usePageTitle from '../hooks/usePageTitle'
import DashboardLayout from '../layouts/DashboardLayout';
import Button from '../components/common/Button';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer, usePDF } from '@react-pdf/renderer';
import CertificateBg from '../components/certificates/CertificateBg';
import { useContext } from 'react';
import { TenantContext } from '../context/TenantContext';

const CertificatePdf = ({colors}) => {

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    pageBackground: {
      position: 'absolute',
      minWidth: '100%',
      minHeight: '100%',
      display: 'flex',
      height: '100%',
      width: '100%',
    },
  });
  
  return (
    <Document>
      <Page size="A4" orientation='landscape' style={styles.page}>
        <View style={styles.pageBackground}>
          <CertificateBg colors={colors} />
        </View>
          <View style={styles.section}>
            <Text>Hello, World!</Text>
          </View>
      </Page>
    </Document>
  );
};


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
        <title>Membership Academy</title>
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