import api from "./api";

const eventoService = {};

/* CRUD */
eventoService.obtenerEventos = () => api.get(`/api/eventos/`);
eventoService.obtenerEvento = (id) => api.get(`/api/eventos/${id}`);
eventoService.agregarEvento = (payload) => api.post("/api/eventos/", {...payload});
eventoService.modificarEvento = (id, payload) => api.put(`/api/eventos/${id}`, {...payload});
eventoService.eliminarEvento = (id) => api.delete(`/api/eventos/${id}`);
/* **** */

export default eventoService;