import IUser from "@/interfaces/user";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
    accessToken: string | null;
    children: React.ReactNode;
};

const PrivateRouter = ({ accessToken, children }: Props) => {
    if (!accessToken || accessToken === null) return <Navigate to="/login" />;

    return children;
};

export default PrivateRouter;
