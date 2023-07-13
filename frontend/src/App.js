import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
          <Routes>
            <Route element={<HomeScreen />} path="/" />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
