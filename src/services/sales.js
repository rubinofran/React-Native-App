import api from "./api";

const ventaService = {};

/* CRUD */
ventaService.obtenerVentas = () => api.get(`/api/ventas/`);
/* productoService.obtenerProducto = (id) => api.get(`/api/productos/${id}`); */
ventaService.agregarVenta = (payload) => api.post("/api/ventas/", {...payload});
/* productoService.modificarProducto = (id, payload) => api.put(`/api/productos/${id}`, {...payload}); */
ventaService.eliminarVenta = (ide, idp, precio) => api.delete(`/api/ventas/${ide}&${idp}&${precio}`);
/* **** */

export default ventaService;