import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="My Bus is an online bus ticketing app" />
        <meta name="keywords" content='Online Bus Ticketing, Bus Booking'/>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Abyssinica+SIL&family=Antic+Didone&family=Inter&family=Open+Sans&family=Poppins:wght@300;400;600&family=Raleway:wght@900&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}