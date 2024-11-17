import "./App.css";
import AppRouter from "./Router";
import Navbar from "./Pages/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
function App() {
  return (
    <>
      <Navbar/>
      <AppRouter/>
      <Footer/>
    </>
  );
}

export default App;
