import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebPage from './page/WebPage';
import { TokenProvider } from './contexts/TokenContext';
import { CourseProvider } from './contexts/CourseContext';
import { TeamProvider } from './contexts/TeamContext';
import { ApiProvider } from './contexts/ApiContext';
import { SidebarProvider } from './contexts/SidebarContext';

function App() {
  return (
    <TokenProvider>
      <SidebarProvider>
        <ApiProvider>
          <CourseProvider>
            <TeamProvider>
              <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                  <Route path='/*' element={<WebPage/>}/>
                </Routes>
              </BrowserRouter>
            </TeamProvider>
          </CourseProvider>
        </ApiProvider>
      </SidebarProvider>
    </TokenProvider>
  );
}

export default App;
