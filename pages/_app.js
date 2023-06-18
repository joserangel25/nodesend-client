import { useEffect } from 'react'
import Layout from '../components/Layout'
import '../styles/globals.css'
import AuthProvider from '../context/auth/authContext'

function MyApp({ Component, pageProps }) {  
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>

  )
}

export default MyApp
