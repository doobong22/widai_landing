import React, { useEffect, useState, useRef } from 'react';

export default function InputSelect(props) {
    const { 
        className, 
        placeholder, 
        type, 
        name, 
        name2, 
        maxlength, 
        value, 
        setValue, 
        valid, 
        label, 
        error, 
        success, 
        readOnly, 
        option=[],
        optionLabel,
        city,
        handleChange,
        optionYear,
        optionMonth,
        optionHour,
        optionMin,
        optionHp,
        optionNotKey,
        style,
        labelStyle,
        full,
        setIsSelect,
        setCSS,
        setView,
        setPlaceholder,
        scroll
    } = props;

    const optionRefs = useRef([]);

    const [selectItem, setSelectItem] = useState(setPlaceholder || "Select");
    const [selectView, setSelectView] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        if (!setIsSelect) return;
        
        if (selectItem === (setPlaceholder || "Select")) {
            setIsSelect(false);
        } else {
            setIsSelect(true);
        }
    }, [selectItem, setIsSelect]);

    useEffect(() => {
        if (!setView) {
            setSelectView(false);
        }
       
    }, [setView]);

    useEffect(() => {
        if (!scroll) return;
        if (!selectView) return;
    
        const idx = option.findIndex(
            x => (x.idx ?? x) === value
        );
    
        if (idx < 0) return;
    
        const el = document.querySelector(`.drop_down p:nth-child(${idx + 1})`);
        if (el) el.scrollIntoView({ block: "center" });
    }, [selectView]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setSelectView(false);
            }
        };
    
        if (selectView) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectView]);

    /* useEffect(() => { // 자동 첫 항목
        if (option.length > 0 && selectItem === "Select") {
            const firstItem = option[0];
            const label = firstItem.title ?? firstItem;
            setSelectItem(label);
            if (setValue) setValue(firstItem.idx ?? label);
        }
    }, [option, selectItem]); */

    useEffect(() => {
        if (option.length > 0 && selectItem === (setPlaceholder || "Select")) {
            if (value && value !== "Select Model") {
                const found = option.find(x => (x.idx ?? x) === value);
                if (found) {
                    const label = found.title ?? found;
                    setSelectItem(label);
                }
            }
        }
    }, [option, selectItem, value]);

    return (
        <div ref={selectRef} className={`${full ? "input_box input_box_select input_box_full" : "input_box input_box_select"} ${setCSS ? setCSS : ''}`} style={style}>
            {label && 
                <label className="input_label" style={labelStyle} htmlFor={name}>
                    {label}
                </label>
            }

            {optionLabel && 
                <span className="input_option_label">{optionLabel}</span>
            }
            
            <div className="input_section">
                <div 
                    name={name} 
                    onChange={handleChange} 
                    key={value} 
                    defaultValue={value} 
                    className={`custom_select ${readOnly && "disable"} ${selectView && 'on'}`} 
                    disabled={readOnly}
                    onClick={() => {
                        setSelectView(prev => !prev);
                    }}
                >
                    <p value="" className="items">{selectItem}</p>
                    
                    <div className={`drop_down ${selectView && 'on'}`}>
                        {option && option.map((x, i) => {
                            const label = x.title ?? x;
                            return (
                                <p 
                                    key={i} 
                                    className={label === selectItem ? "on" : ""}
                                    onClick={() => {
                                        setSelectItem(label);
                                        if(setValue) setValue(x.idx ?? label);
                                    }}
                                >
                                    {label}
                                </p>
                            )
                        })}
                    </div>
                    
                </div>
            </div>

            {error &&
                <p className="input_error animate__animated animate__headShake">{error}</p>
            }
            {success && 
                <p className="input_success">{success}</p>    
            }
        </div>
    )    
}