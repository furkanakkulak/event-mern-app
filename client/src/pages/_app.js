import Navbar from '@/components/Navbar';
import { EventProvider } from '@/context';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <EventProvider>
      <Navbar />
      <Component {...pageProps} />
    </EventProvider>
  );
}
