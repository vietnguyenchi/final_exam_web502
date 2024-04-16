import React, { useEffect, useState } from "react";
import Joi from "joi";
import IProduct from "@/interfaces/product";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate, useParams } from "react-router-dom";
import instance from "@/apis";

const productSchema = Joi.object({
    title: Joi.string().required().min(6),
    price: Joi.number().required().min(100),
    stock: Joi.number().required().min(0),
    description: Joi.string().allow(null, ""),
});

type Props = {
    onEdit: (product: IProduct) => void;
};

const EditProduct = ({ onEdit }: Props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get("/products/" + id);
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IProduct>({ resolver: joiResolver(productSchema) });

    const onSubmit = (product: IProduct) => {
        onEdit({ ...product, id });
        alert("Update Product successfully!");
        navigate("/admin");
    };

    return (
        <div className="container">
            <h1 className="my-2">Update Product</h1>
            <form className="w-50" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        {...register("title", {
                            required: true,
                            min: 6,
                        })}
                        defaultValue={product?.title}
                    />
                    {errors.title && (
                        <span className="text-danger">
                            {errors.title.message}
                        </span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        {...register("price", {
                            required: true,
                            min: 100,
                        })}
                        defaultValue={product?.price}
                    />
                    {errors.price && (
                        <span className="text-danger">
                            {errors.price.message}
                        </span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">
                        Stock
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        {...register("stock", {
                            required: true,
                            min: 0,
                        })}
                        defaultValue={product?.stock}
                    />
                    {errors.stock && (
                        <span className="text-danger">
                            {errors.stock.message}
                        </span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        cols={30}
                        rows={10}
                        {...register("description", {
                            required: true,
                        })}
                        defaultValue={product?.description}
                    />
                    {errors.description && (
                        <span className="text-danger">
                            {errors.description.message}
                        </span>
                    )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
