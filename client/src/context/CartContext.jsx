import { createContext, useContext, useState, useEffect} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
 const [items, setItems] = useState(() => {
 try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);


  // ➕ Agregar producto
  const addToCart = (producto) => {
    setItems((prev) => {
      const existente = prev.find((p) => p.id === producto.id);

      if (existente) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p 
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // ➖ Eliminar producto
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔼 Aumentar cantidad
  const increase = (id) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  // 🔽 Disminuir cantidad
  const decrease = (id) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const clearCart = () => {
  setItems([]);
};

   return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, increase, decrease, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartState = () => useContext(CartContext);