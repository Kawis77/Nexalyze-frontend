import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<h1>Login</h1>} />
    
            </Routes>
        </Router>
    );
}

export default App;
