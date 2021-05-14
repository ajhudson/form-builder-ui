import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import RenderDynamicForm from './components/form-renderer/render-dynamic-form';

function App() {
  return (
    <Router>
      <Route path="/" exact component={RenderDynamicForm} />
      <Route path="/render-form" component={RenderDynamicForm} />
    </Router>
  );
}

export default App;
