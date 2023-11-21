import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
import CertificateBg from './CertificateBg';
import { CertificateSvg } from './CertificateSvg';
import { certificateSvgXml } from './certificateSvgXml';

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

  const userCourseEdge = certificate.courseUserContent
  let date
  if(certificate.isScored) {
    date = userCourseEdge.passedAt            
  } else {
    date = userCourseEdge.completedAt
  }

  const displayDate = dayjs(date).format('Do MMMM YYYY')

  return (
    user ? (
    <Document>
      <Page size="A4" orientation='landscape' style={styles.page}>
        <View style={styles.pageBackground}>
          <CertificateSvg svgXml={certificateSvgXml(colors)} />
        </View>
          <View style={styles.section}>
            <Text style={{
              marginTop: 290
            }}>
              This certificate has been awarded to:
            </Text>
            <Text style={{
              fontSize: 28,
              marginTop: 20,
              fontFamily: 'Times-Bold',
            }}>
              {user.fullName}
            </Text>
            <Text style={{
              marginTop: 20
            }}>for completing</Text>
            <Text style={{
              fontSize: 28,
              marginTop: 20,
              fontFamily: 'Times-Italic',
            }}>{certificate.course?.title}</Text>
            {/* { certificate.isScored && (
              <Text style={{
                marginTop: 20,
              }}>With a score of: {certificate.score}/100</Text>
            )} */}
            <Text
            style={{
              marginTop: 20,
            }}>on</Text>
            <Text
            style={{
              marginTop: 20,
              fontFamily: 'Times-Bold',
            }}>{displayDate}</Text>
            {/* <Image></Image> */}
          </View>
      </Page>
    </Document>
    ) : null
  );
};

export default CertificatePdf