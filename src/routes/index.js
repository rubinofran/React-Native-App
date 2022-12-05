import { NativeRouter, Routes, Route } from "react-router-native";

import Menu from "../components/Menu";
import ProductoLista from "../components/ProductoLista";
import EventoLista from "../components/EventoLista";
import VentaLista from "../components/VentaLista";

function Router() {
    return (
        <NativeRouter>
            <Routes>
                <Route exact path='/' element={<Menu />} />
                <Route exact path='/productos' element={<ProductoLista />} />
                <Route exact path='/eventos' element={<EventoLista />} />
                <Route exact path='/ventas' element={<VentaLista />} />
            </Routes>
        </NativeRouter>
    );
}

export default Router;