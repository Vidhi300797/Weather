import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Tempapp from './components/TempApp';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/weather'  element={<Tempapp />} />
      </Routes>

    </Router>
  );
}

export default App;
