import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import CertificateBg from './CertificateBg';

const CertificatePdf = ({user, certificate, colors}) => {

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      fontFamily: 'Times-Roman',
      textAlign: 'center',
      color: '#222222',
      fontSize: 16
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
    user ? (
    <Document>
      <Page size="A4" orientation='landscape' style={styles.page}>
        <View style={styles.pageBackground}>
          <CertificateBg colors={colors} />
        </View>
          <View style={styles.section}>
            <Text style={{
              marginTop: 150
            }}>
              This certificate has been awardeded to:
            </Text>
            <Text style={{
              fontSize: 28,
              marginTop: 20
            }}>
              {user.fullName}
            </Text>
            <Text style={{
              marginTop: 20
            }}>for completing</Text>
            <Text style={{
              fontSize: 28,
              marginTop: 20,
              fontStyle: 'italic'
            }}>{certificate.node.title}</Text>
            <Text style={{
              marginTop: 20,
            }}>With a score of: {certificate.score}/100</Text>
            <Text
            style={{
              marginTop: 20,
              fontStyle: 'italic'
            }}>on {certificate.completedAt}</Text>
            {/* <Image></Image> */}
          </View>
      </Page>
    </Document>
    ) : null
  );
};

export default CertificatePdf