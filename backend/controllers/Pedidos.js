import Pedidos from "../models/PedidosSchema";

// Crear un nuevo pedido
export const crearPedido = async (req, res) => {
    try {
        const {productos, total } = req.body;

        if(!productos || productos.length === 0) {
            return res.status(400).json({ msg: "El pedido debe contener al menos un producto." });
        }

        const productosFormateados = productos.map(item => ({
            producto: item.producto,
            cantidad: item.cantidad,
            preciounitario: item.preciounitario,
            subtotal: item.subtotal
        }));

        const nuevoPedido = new Pedidos({   
            cliente: req.usuario.id,
            prfuctos: productosFormateados,
            total,
        });
        await nuevoPedido.save();
        res.status(201).json({message : "Pedido creado exitosamente", nuevoPedido});

    } catch (error) {
        console.error(' <o> Error al crear el pedido: ', error.message);
        res.status(500).json({
            msg: 'Error en el servidor :('
        });
    }
}