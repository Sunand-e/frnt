interface TenantSettingResponse {
  [key: string]: any; // this to allow properties with any type
}

export const tenantSettingResponse: TenantSettingResponse = {
  "tags": {
    "categories": {
      "enabled": true
    },
    "collections": {
      "enabled": true
    }
  },
  "users": {
    "limit": false,
    "limit_count": "20"
  },
  "groups": {
    "enabled": true
  },
  "styles": {
    "body": {},
    "headings": {}
  },
  "courses": {
    "builder": {
      "enabled": true
    },
    "enabled": true,
    "reports": {
      "enabled": true
    },
    "showSendCourseFeedbackButton": true,
    "showSendFeedbackButtonCourseSetting": true
  },
  "reports": {
    "enabled": true
  },
  "pathways": {
    "enabled": true,
    "reports": {
      "enabled": false
    }
  },
  "resources": {
    "enabled": true,
    "reports": {
      "enabled": false
    }
  },
  "certificates": {
    "awardingBodyText": ""
  },
  "mediaLibrary": {
    "enabled": true
  },
  "organisations": {
    "enabled": false,
    "allowUserLeaderInMultipleOrganizations": true
  },
  "public_settings": {},
  "primaryBrandColor": "#01A2FA",
  "secondaryBrandColor": "#002856",
  "canShareSharedContent": true,
  "canUpdateSharedContentEnrolmentLimits": true,
  "custom_fonts": [],
  "name": "eLearning Plus",
  "logo": '/images/zanda-logo-colour.svg',
  "logo_white": '/images/default-email-logo.png',
  "logo_square": '/images/elp-logo-notext-white.svg',
  "logo_square_white": '/images/elp-logo-notext-white.svg',
  "logo_for_emails": '/images/default-email-logo.png',
  "logo_for_certs": '/images/zanda-logo-colour.svg',
  "logo_awarding_body": '/images/zanda-logo-colour.svg'
}