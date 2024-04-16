import React from "react";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import IUser from "@/interfaces/user";
import instance from "@/apis";

const userSchema = Joi.object({
    email: Joi.string().required().email({ tlds: false }),
    password: Joi.string().required().min(6),
});

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUser>({ resolver: joiResolver(userSchema) });

    const onSubmit = async (user: IUser) => {
        try {
            const { data } = await instance.post("/register", {
                ...user,
                role: "user",
            });
            if (data.user) {
                window.confirm(
                    "Register successfully, switching to log in page."
                ) && navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-2">Register</h1>
            <form className="w-50" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        {...register("email", {
                            required: true,
                            min: 6,
                        })}
                    />
                    {errors.email && (
                        <span className="text-danger">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register("password", {
                            required: true,
                            min: 6,
                        })}
                    />
                    {errors.password && (
                        <span className="text-danger">
                            {errors.password.message}
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

export default Register;
