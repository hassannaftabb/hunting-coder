import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return <>
  <Head>
    <title>Hunting Coder</title>
  </Head>
  <Navbar/>
  <Component {...pageProps} /> 
  <footer className='footer'>
    <strong>Developed By: </strong><em>Hassan Aftab</em>
  </footer>
  </>
}

export default MyApp
