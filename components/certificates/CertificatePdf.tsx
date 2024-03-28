import { Document, Page, StyleSheet, Text, View, Font, Svg, Line, Image } from '@react-pdf/renderer';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
import { CertificateSvg } from './CertificateSvg';
import { certificateSvgXml } from './certificateSvgXml';

Font.register({ family: 'Birthstone', src: 'https://fonts.gstatic.com/s/birthstone/v14/8AtsGs2xO4yLRhy87sv_HLn5jRfZHzM.ttf' });
Font.register({ family: 'Lato', src: 'https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk6XweuBCY.ttf' });

const CertificatePdf = ({user, certificate, tenant}) => {

  const colors = {
    primary: tenant.primaryBrandColor || '#555555',
    secondary: tenant.secondaryBrandColor || '#222222'
  }
  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      fontFamily: 'Lato',
      textAlign: 'center',
      color: '#222222',
    },
    textSection: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      fontSize: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    pageBackground: {
      position: 'absolute',
      backgroundColor: '#ffffff',
      minWidth: '100%',
      minHeight: '100%',
      display: 'flex',
      height: '100%',
      width: '100%',
    },
    awardedBy: {
      position: 'absolute',
      right: 20,
      bottom: 0,
      width: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    logo: {
      height: '100%',
      width: 100,
      marginBottom: 10
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
        
        { !!certificate.logoUrl && (
          <View style={styles.awardedBy}>
            <Text style={{
              fontSize: 12,
              marginBottom: 8
            }}>Awarded by</Text>
            <View>
              <Image src={certificate.logoUrl}  style={styles.logo} />
              {/* <CertificateSvg svgXml={certificateLogoXml(logo)} /> */}
            </View>
          </View>
        )}

        <View style={styles.textSection}>
          <Text style={{
            marginTop: 290
          }}>
            This certificate has been awarded to:
          </Text>
          <Text style={{
            fontSize: 38,
            marginTop: 20,
            fontFamily: 'Birthstone',
          }}>
            {user.fullName}
          </Text>
          <Svg height="1" width="200">
            <Line
              x1="0"
              y1="0"
              x2="240"
              y2="0"
              strokeWidth={1}
              stroke={colors.secondary}
            />
          </Svg>
          <Text style={{
            marginTop: 20
          }}>for successfully completing</Text>
          <Text style={{
            fontSize: 28,
            marginTop: 20,
            fontFamily: 'Birthstone',
          }}>
            {certificate.course?.title}
          </Text>
          {/* { certificate.isScored && (
            <Text style={{
              marginTop: 20,
            }}>With a score of: {certificate.score}/100</Text>
          )} */}
          <Text
          style={{
            marginTop: 20,
            fontSize: 12,
          }}>on {displayDate}</Text>
        </View>
      </Page>
    </Document>
    ) : null
  );
};

export default CertificatePdf