import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import IProduct from "./interfaces/product";
import instance from "./apis";
import PrivateRouter from "./components/PrivateRouter";

function App() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get("/products");
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleDelete = async (id: string | number) => {
        try {
            if (confirm("Are you sure you want to delete this item?")) {
                await instance.delete("/products/" + id);
                setProducts(products.filter((product) => product.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddProduct = async (product: IProduct) => {
        try {
            const { data } = await instance.post("/products", product);
            setProducts([...products, data]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditProduct = async (product: IProduct) => {
        try {
            const { data } = await instance.put(
                "/products/" + product.id,
                product
            );
            setProducts(
                products.map((product) =>
                    product.id === data.id ? data : product
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar setLogout={setUser} />
            <Routes>
                <Route path="/">
                    <Route index element={<Homepage />} />
                    <Route
                        path="/login"
                        element={<Login setLogin={setUser} />}
                    />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/admin">
                    <Route
                        index
                        element={
                            <PrivateRouter accessToken={user}>
                                <Dashboard
                                    onDelete={handleDelete}
                                    products={products}
                                />
                            </PrivateRouter>
                        }
                    />
                    <Route
                        path="/admin/add"
                        element={
                            <PrivateRouter accessToken={user}>
                                <AddProduct onAdd={handleAddProduct} />
                            </PrivateRouter>
                        }
                    />
                    <Route
                        path="/admin/edit/:id"
                        element={
                            <PrivateRouter accessToken={user}>
                                <EditProduct onEdit={handleEditProduct} />
                            </PrivateRouter>
                        }
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
