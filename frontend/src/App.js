import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

function App() {
  
  return (
    <>
   
    <HelmetProvider>
      <ToastContainer />
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    </>
  );
}


export default App