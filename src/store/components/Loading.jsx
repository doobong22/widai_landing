import React from "react";
import { BeatLoader } from "react-spinners";

// stores
import { useLoading } from "@/store";

export default function LoadingRoot() {
    const loading = useLoading((state) => state.loading);

    if (!loading) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255,255,255,0.5)",
            zIndex: 9999999,
        }}>
            <BeatLoader
                color="#59659F"
                size={20}
                speedMultiplier={1.5}
            />
        </div>
    );
}