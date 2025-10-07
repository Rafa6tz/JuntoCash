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
        <Route path="/transaction" element={<Transaction/>}/>
        <Route path="/graphs" element={<Graph/>}/>
        <Route path="/goal" element={<Goal/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
