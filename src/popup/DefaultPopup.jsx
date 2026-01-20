import React, { useEffect, useState } from "react";

import { useLoading, usePopup } from "@/store";

import Input from "@/components/Input";
import images from '@/libs/images';


export default function DefaultPopup(props) {
    const { 
        maxWidth,
        setFunc,
        cancelFunc,
        buttonLong,
        deletAcc
    } = props;

    const { closePopup } = usePopup();
    const { startLoading, endLoading } = useLoading();

    const setFunction = () => {
        if(setFunc) {
            setFunc();
        }
        closePopup();
    };

    const cancelFunction = () => {
        if(cancelFunc) {
            cancelFunc();
        }
        closePopup();
    }

    const InputChange = (event) => {
        const { name, value } = event.target;

    }

    return (
        <div 
            className="popup_default01" 
            style={{ 
                maxWidth: maxWidth ? maxWidth : "400px", 
                width: "100%",
            }}
        >
            <div className="popup_content_box">
                {deletAcc &&
                    <div className="popup_delete_suc_box">
                        <img src={images.delete_acc} />
                    </div>
                }
                {props.title && (
                    <div className="popup_title_box">
                        <p>{props.title}</p>
                    </div>
                )}

                {props.text && (
                    <div className="popup_text_box">
                        <p>{props.text}</p>
                    </div>
                )}

                <div className="popup_btn_box">
                    {props.buttonCancel && (
                        <button
                            className="button_cancel"
                            onClick={() => {
                                cancelFunction();
                            }}
                        >
                            {props.buttonCancel}
                        </button>
                    )}
                    {props.button && (
                        <button
                            className="button_success"
                            onClick={() => {
                                setFunction();
                            }}
                        >
                            {props.button}
                        </button>
                    )}
                    {buttonLong &&
                        <button
                            className="button_success long"
                            onClick={() => {
                                setFunction();
                            }}
                        >
                            {buttonLong}
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}