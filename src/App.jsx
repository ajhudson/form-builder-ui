import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import RenderDynamicForm from './components/form-renderer/render-dynamic-form';
import formConfig from './components/assets/form-data.json';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <RenderDynamicForm formConfig={formConfig} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
