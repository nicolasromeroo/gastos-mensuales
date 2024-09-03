
import GestionGastos from './Components/GestionGastos'
import ExpensesList from './Components/ExpensesList'

function App() {
  return (
    <div className="App">
      <GestionGastos />
      <ExpensesList />
    </div>
  )
}

export default App

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import GestionarGastos from './Components/GestionarGastos';

// const App = () => {
//     return (
//         <Router>
//             <Switch>
//                 <Route path="/gastos" component={GestionarGastos} />
//                 {/* Otros routes */}
//             </Switch>
//         </Router>
//     );
// };

// export default App;

