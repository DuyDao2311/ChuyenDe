import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup.js';
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './Pages/Allbooks';
import Header from './Components/Header';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import BorrowCart from './Pages/BorrowCart'; // ✅ ĐÚNG
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext.js";

function App() {

  const { user } = useContext(AuthContext);

  // Hàm kiểm tra xem user có phải admin không (dựa trên mảng roles)
  const isAdmin = (u) => {
    if (!u) return false;
    
    // Chuẩn hóa roles
    const roles = (() => {
      const r = [];
      if (u.roles) r.push(...(Array.isArray(u.roles) ? u.roles : [u.roles]));
      if (u.role) r.push(u.role);
      if (u.isAdmin) r.push("admin");
      return Array.from(new Set(r.filter(Boolean)));
    })();
    
    // Debug để kiểm tra
    console.log("🔍 App.js - Checking user:", u);
    console.log("🔍 App.js - User roles:", roles);
    console.log("🔍 App.js - Is Admin?", roles.includes("admin"));
    
    return roles.includes("admin");
  }

  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>

          {/* HOME */}
          <Route exact path="/">
            <Home />
          </Route>

          {/* SIGN IN */}
          <Route exact path="/signin">
            {user ? (
              isAdmin(user)
                ? <Redirect to="/dashboard@admin" />
                : <Redirect to="/dashboard@member" />
            ) : (
              <Signin />
            )}
          </Route>

          {/* SIGN UP */}
          <Route exact path="/signup">
            {user ? (
              isAdmin(user)
                ? <Redirect to="/dashboard@admin" />
                : <Redirect to="/dashboard@member" />
            ) : (
              <Signup />
            )}
          </Route>
          <Route exact path='/dashboard@member'>
            {user
              ? (!isAdmin(user)
                  ? <MemberDashboard />
                  : <Redirect to='/' />)
              : <Redirect to='/' />}
          </Route>

          <Route exact path='/dashboard@admin'>
            {user
              ? (isAdmin(user)
                  ? <AdminDashboard />
                  : <Redirect to='/' />)
              : <Redirect to='/' />}
          </Route>

          <Route exact path='/books'>
            <Allbooks />
          </Route>

          {/* ✅ GIỎ HÀNG MƯỢN SÁCH */}
          <Route exact path='/books/borrow-cart'>
            {user ? <BorrowCart /> : <Redirect to="/signin" />}
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
