import React, { useEffect } from "react";

// stores
import { usePopup } from "@/store";

export default function Popup() {
    const {
        open,
        title,
        message,
        button,
        buttonCancel,
        onCancelPress,
        onPress,
        component,
        closePopup,
        className,
    } = usePopup();

    useEffect(() => {
        if (open) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.width = "100%";
        } else {
            const scrollY = parseInt(document.body.style.top || "0", 10) * -1;
            document.body.style.position = "";
            document.body.style.top = "";
            window.scrollTo(0, scrollY);
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className={`popup show ${className || ""}`} id="container_part">
            {component ? (
                component
            ) : (
                <div className="popup_container">
                    <div className="popup_top">
                        <div className="popup_title_section">
                            <p className="popup_title">{title}</p>
                            <button
                                type="button"
                                className="exit_btn"
                                onClick={() => {
                                    closePopup();
                                    onCancelPress && onCancelPress();
                                }}
                            />
                        </div>

                        <p className="popup_msg">{message}</p>
                    </div>

                    <div className="popup_btn">
                        {buttonCancel && (
                            <button
                                type="button"
                                className="popbtn cencle_btn"
                                onClick={() => {
                                    closePopup();
                                    onCancelPress && onCancelPress();
                                }}
                            >
                                {buttonCancel}
                            </button>
                        )}
                        <button
                            type="button"
                            className="popbtn ok_btn"
                            onClick={() => {
                                closePopup();
                                onPress && onPress();
                            }}
                            style={{ width: buttonCancel ? "" : "100%" }}
                        >
                            {button}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}