certificateTemplateId: e0ba562e-a5df-4ba0-be71-c34c13e942f8
CertificateTemplate {

    textColor: '#0000ff'

    placeholders {
        logo: {
            x: 300
            y: 200
            src: MediaLibraryId
        }
        contentItemTitle: {
            x: 300
            y: 400
            fontSize: '12px'
            color: '#ff0000'
        }
        date: {
            x: 300
            y: 600
            format: 'dd/mm/yy'
        }
    }    
}




ContentItem: certificateData
{
    certificateTemplateId: e0ba562e-a5df-4ba0-be71-c34c13e942f8

    rules {
        requiredPercentage: 80
    }

    overrides: {
        textColor: '#00ff00'
        placeholders {
            contentItemTitle: {
                fontSize: '14px'
            }
        }    
    }    
}



certificateTemplateId: e0ba562e-a5df-4ba0-be71-c34c13e942f8
CertificateTemplate {

    textColor: '#00ff00'
    background image: 'url'
    
    placeholders {
        logo: {
            x: 300
            y: 200
            src: MediaLibraryId
        }
        contentItemTitle: {
            x: 300
            y: 400
            fontSize: '14px'
            color: '#ff0000'
        }
        date: {
            x: 300
            y: 600
            format: 'dd/mm/yy'
        }
        score {}
    }    
}

