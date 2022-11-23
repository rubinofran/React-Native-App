import api from "./api";

const productoService = {};

/* CRUD */
productoService.obtenerProductos = () => api.get(`/api/productos/`);
productoService.obtenerProducto = (id) => api.get(`/api/productos/${id}`);
productoService.agregarProducto = (payload) => api.post("/api/productos/", {...payload});
productoService.modificarProducto = (id, payload) => api.put(`/api/productos/${id}`, {...payload});
productoService.eliminarProducto = (id) => api.delete(`/api/productos/${id}`);
/* **** */

export default productoService;