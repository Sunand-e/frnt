/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCertificateTemplate
// ====================================================

export interface CreateCertificateTemplate_createCertificateTemplate_certificateTemplate {
  __typename: "CertificateTemplate";
  id: string;
}

export interface CreateCertificateTemplate_createCertificateTemplate {
  __typename: "CreateCertificateTemplatePayload";
  certificateTemplate: CreateCertificateTemplate_createCertificateTemplate_certificateTemplate;
  message: string;
}

export interface CreateCertificateTemplate {
  createCertificateTemplate: CreateCertificateTemplate_createCertificateTemplate | null;
}

export interface CreateCertificateTemplateVariables {
  data: any;
}
