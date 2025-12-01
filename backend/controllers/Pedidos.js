import  Pedidos  from "../models/PedidosSchema.js";

// Obtener todos los pedidos (admin) o pedidos del usuario (cliente)
export const obtenerPedidos = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const esAdmin = req.usuario.rol === 'admin';

        let filtro = {};
        if (!esAdmin) {
            filtro.cliente = usuarioId;
        }

        const pedidos = await Pedidos.find(filtro)
            .populate('cliente', 'nombre email telefono')
            .populate('productos.producto', 'nombre precio imagen')
            .sort({ createdAt: -1 });
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos:', error.message);
        res.status(500).json({ msg: 'Error en el servidor :(' });
    }
};

// Obtener pedidos del usuario autenticado
export const obtenerMisPedidos = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const pedidos = await Pedidos.find({ cliente: usuarioId })
            .populate('cliente', 'nombre email telefono')
            .populate('productos.producto', 'nombre precio imagen')
            .sort({ createdAt: -1 });
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al obtener mis pedidos:', error.message);
        res.status(500).json({ msg: 'Error en el servidor :(' });
    }
};

// Crear un nuevo pedido
export const crearPedido = async (req, res) => {
    try {
        const {productos, total } = req.body;

        if(!productos || productos.length === 0) {
            return res.status(400).json({ msg: "El pedido debe contener al menos un producto." });
        }

    

        const nuevoPedido = new Pedidos({   
            cliente: req.usuario.id,
            productos,
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
};

// Actualizar estado del pedido (admin)
export const actualizarEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (!['PENDIENTE', 'COMPLETADO', 'CANCELADO'].includes(estado)) {
            return res.status(400).json({ msg: "Estado inválido" });
        }

        const pedidoActualizado = await Pedidos.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );

        if (!pedidoActualizado) {
            return res.status(404).json({ msg: "Pedido no encontrado" });
        }

        res.status(200).json({ message: "Estado actualizado", pedidoActualizado });
    } catch (error) {
        console.error('Error al actualizar estado:', error.message);
        res.status(500).json({ msg: 'Error en el servidor :(' });
    }
};

// Eliminar pedido (admin)
export const eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;

        const pedidoEliminado = await Pedidos.findByIdAndDelete(id);

        if (!pedidoEliminado) {
            return res.status(404).json({ msg: "Pedido no encontrado" });
        }

        res.status(200).json({ message: "Pedido eliminado", pedidoEliminado });
    } catch (error) {
        console.error('Error al eliminar pedido:', error.message);
        res.status(500).json({ msg: 'Error en el servidor :(' });
    }
}