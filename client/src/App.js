import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./view/home";
import ProductContextProvider from "./context/ProductContext";
import AuthContextProvider from "./context/AuthContext";
import Detail from "./view/detail/Detail";
import Login from "./view/login/Login";
import Add from "./view/add/Add";

function App() {
    return (
        <AuthContextProvider>
            <ProductContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/detail/:idParams"
                            component={Detail}
                        />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/add" component={Add} />
                    </Switch>
                </Router>
            </ProductContextProvider>
        </AuthContextProvider>
    );
}

export default App;
