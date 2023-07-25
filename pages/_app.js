import Layout from '../components/Layout'
import '../styles/globals.css'
import AuthProvider from '../context/auth/authContext'
import AppContextProvider from '../context/app/appContext'

function MyApp({ Component, pageProps }) {  
  return (
    <AuthProvider>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </AuthProvider>

  )
}

export default MyApp
