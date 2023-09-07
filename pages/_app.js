import { AnimatePresence } from 'framer-motion'
import { ApolloProvider } from '@apollo/client';
import client from "../utils/apolloServer"
import '../styles/globals.css'
import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

function MyApp({ Component, pageProps }) {
  return (
  <ApolloProvider client={client}>
    <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <Component {...pageProps} />
    </AnimatePresence>
  </ApolloProvider>
  )
}

export default MyApp
