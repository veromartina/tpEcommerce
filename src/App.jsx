import { CartProvider } from "./context/CartContext";  // Asegúrate de importar el CartProvider
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <CartProvider> {/* Envuelve AppLayout con CartProvider */}
      <AppLayout />
    </CartProvider>
  );
}

export default App;