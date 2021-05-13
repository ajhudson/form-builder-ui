import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import Test from './components/test/test';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/test" component={Test} />
    </Router>
  );
}

export default App;
