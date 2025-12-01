import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './components/context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
);
