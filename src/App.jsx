import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './page/MainPage';

function App() {
  return (
    <BrowserRouter>
      <MainPage/>
    </BrowserRouter>
    
  );
}

export default App;
