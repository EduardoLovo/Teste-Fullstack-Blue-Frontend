import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { JwtHandler } from './jwt-handler/jwt-handler';
import { ToDoList } from './pages/ToDoList/ToDoList';
import { Edit } from './pages/Edit/Edit';

function App() {

  const PrivateRoute = ({ children, redirectTo }) => {
    const isAuthenticated = JwtHandler.isJwtValid();
    // console.log("isAuh:", isAuthenticated);
    return isAuthenticated ? children : <Navigate to={redirectTo} />
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/todolist"
          element={
            <PrivateRoute redirectTo='/'>
              <ToDoList />
            </PrivateRoute>}
        />
        <Route
          path="/editTask/:id"
          element={
            <PrivateRoute redirectTo='/'>
              <Edit />
            </PrivateRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
