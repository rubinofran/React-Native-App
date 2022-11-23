import { NativeRouter, Routes, Route } from "react-router-native";

import Menu from "../components/Menu";
import ProductoLista from "../components/ProductoLista";
import EventoLista from "../components/EventoLista";

function Router() {
    return (
        <NativeRouter>
            <Routes>
                <Route exact path='/' element={<Menu />} />
                <Route exact path='/productos' element={<ProductoLista />} />
                <Route exact path='/eventos' element={<EventoLista />} />
            </Routes>
        </NativeRouter>
    );
}

export default Router;