import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebPage from './page/WebPage';
import { TokenProvider } from './contexts/TokenContext';
import { CourseProvider } from './contexts/CourseContext';
import { TeamProvider } from './contexts/TeamContext';

function App() {
  return (
    <TokenProvider>
      <CourseProvider>
        <TeamProvider>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route path='/*' element={<WebPage/>}/>
            </Routes>
          </BrowserRouter>
        </TeamProvider>
      </CourseProvider>
    </TokenProvider>
  );
}

export default App;
