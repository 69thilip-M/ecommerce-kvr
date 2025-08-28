import Navbar from "../components/Navbar"; // Adjust path if needed
import Footer from "../components/Footer";
function Cart() {
  return (
    <div className="h-screen bg-green-100 flex flex-col">
      {/* Navbar */}
      <Navbar />
      <p>cart</p>
      <Footer />
    </div>
  );
}
export default Cart;
