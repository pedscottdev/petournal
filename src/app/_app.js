import '@/styles/globals.css'
import nprogress from 'nprogress';
import Router from 'next/navigation';
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }) {
  Router.events.on('routeChangeStart', () => nprogress.start());
  Router.events.on('routeChangeComplete', () => nprogress.done());
  Router.events.on('routeChangeError', () => nprogress.done());
  return <Component {...pageProps} />;
}

export default MyApp;
