import IProduct from "@/interfaces/product";
import { Link } from "react-router-dom";

type Props = {
    products: IProduct[];
    onDelete: (id: number | string) => void;
};

const Dashboard = ({ products, onDelete }: Props) => {
    return (
        <div className="container">
            <h1 className="my-3">Dashboard</h1>
            <Link to="/admin/add" className="btn btn-primary mb-3">
                Add Product
            </Link>
            <table className="table table-bordered table-striped table-hovered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link
                                    to={`/admin/edit/${product.id}`}
                                    className="btn btn-success fw-medium text-light w-100 mb-1"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => onDelete(Number(product.id))}
                                    className="btn btn-danger fw-medium text-light w-100 mb-1"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
