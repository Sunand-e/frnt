import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          {/* This is where we might put a div which can be used as a react 'portal' */}
          <NextScript />
        </body>
      </Html>
    )
  }
}