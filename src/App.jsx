import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ClientPage from './page/ClientPage';

function App() {
  return (
    <BrowserRouter>
      <ClientPage/>
    </BrowserRouter>
    
  );
}

export default App;
