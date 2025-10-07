import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Register from "./pages/Register"
import Wallet from "./pages/Wallet"
import Login from "./pages/Login"
import Transaction from "./pages/Transaction"
import Graph from "./pages/Graph"
import Goal from "./pages/Goal"
import WalletNav from "./components/WalletNav"
import PrivateRoute from "./components/PrivateRoute"


function App() {

  
  return (
    <>
    <BrowserRouter>
      <WalletNav/>
      <Nav/>
      <Routes>
        <Route path="/" element={<PrivateRoute/>}>
        <Route index element={<Wallet/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/transaction" element={<PrivateRoute/>}>
        <Route index element={<Transaction/>}/>
        </Route>
        <Route path="/graphs" element={<PrivateRoute/>}>
        <Route index element={<Graph/>}/>
        </Route>
        <Route path="/goal" element={<PrivateRoute/>}>
        <Route index element={<Goal/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
