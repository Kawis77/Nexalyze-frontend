import React from 'react';
import ReactDOM from 'react-dom/client';
import OrganizationForm from './components/OrganizationForm';
import { BrowserRouter as Router } from 'react-router-dom'; // Importujemy BrowserRouter


function App() {
  return (
    <Router> { /* Owijamy naszą aplikację w BrowserRouter */}
    <div className="App">
      <h1>Hello, World!</h1>
      <OrganizationForm></OrganizationForm>
    </div>
    </Router>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


