import '@/styles/globals.css'
import Router from 'next/navigation';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

function MyApp({ Component, pageProps }) {
  return (
    <>   
      <Component {...pageProps} />
      <ProgressBar
            height="4px"
            color="#9B66FD"
            options={{ showSpinner: false }}
            shallowRouting
      />
    </>
  )
  
}

export default MyApp;
