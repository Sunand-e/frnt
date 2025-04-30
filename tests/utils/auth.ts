import { BrowserContext } from "@playwright/test";

export async function loginUser(context: BrowserContext) {
  await context.addCookies([
    {
      name: 'jwt_header_payload',
      value: 'randomHeaderPayloadValue',
      domain: '127.0.0.1', 
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    },
    {
      name: 'jwt_signature',
      value: 'randomSignatureValue',
      domain: '127.0.0.1',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    }
  ]);
};
