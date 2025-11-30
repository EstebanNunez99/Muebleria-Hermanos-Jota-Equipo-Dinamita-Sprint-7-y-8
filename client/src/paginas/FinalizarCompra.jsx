import "../estilos/FinalizarCompra.css";
import { useCartState } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function FinalizarCompra() {
  const { items, increase, decrease } = useCartState();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const irACompra = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate("/confirmar-pedido");
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Mi carrito</h1>

      <div className="checkout-layout">
        
        <div className="checkout-left">
          {items.map((item, index) => (
            <div key={index} className="checkout-item">
              <img src={item.imagen} alt={item.nombre} className="checkout-img" />

              <div className="checkout-info"> 
                

                <h3>{item.nombre}</h3>

                <div className="checkout-prices">
                  <span className="precio-tachado">${item.precioOriginal || ""}</span>
                  <span className="precio-final">${item.precio}</span>
                </div>

    
                <div className="cantidad-box">
                  <button className="cantidad-btn" onClick={() => decrease(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button className="cantidad-btn" onClick={() => increase(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="checkout-right">
          <h2>RESUMEN</h2>
          <p>{items.length} productos</p>

          <div className="precio-total">
            <span>Total</span>
            <strong>${total}</strong>
          </div>


          <button className="btn-comprar" onClick={irACompra}>
            Iniciar compra
          </button>

          <button className="btn-volver" onClick={() => navigate("/catalogo")}>
            Ver más productos
          </button>
        </div>
      </div>
    </div>
  );
}
