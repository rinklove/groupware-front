import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import WebPage from './page/WebPage';
import { TokenProvider } from './contexts/TokenContext';
import { CourseProvider } from './contexts/CourseContext';
import { TeamProvider } from './contexts/TeamContext';

function App() {
  return (
    <TokenProvider>
      <CourseProvider>
        <TeamProvider>
          <BrowserRouter basename='/groupware-front'>
            <WebPage/>
          </BrowserRouter>
        </TeamProvider>
      </CourseProvider>
    </TokenProvider>
  );
}

export default App;
