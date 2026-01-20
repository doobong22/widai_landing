import React, { useEffect, useState } from 'react';

export default function TextArea(props) {

    const { 
        className, 
        placeholder, 
        type, 
        name, 
        maxlength, 
        value, 
        setValue, 
        onChange,
        valid, 
        label, 
        error,
        setError, 
        success, 
        readOnly, 
        onKeyDown,
        withButton, 
        withButtonPress,
        withText,
        size,
        index,
        subIndex=null,
        full,
        help,
        search,
        style,
        autoComplete="off",
        onBlur,
        onFocus=() => {}
    } = props;


    const [f, setF] = useState(false);

    const [isOpenPost, setIsOpenPost] = useState(false);

    const handleFocus = () => {
        onFocus();

        setF(true);
        if(withButton === "주소찾기") {
            setIsOpenPost(true);
        }

    };


    const handleChange = (e) => {
        
        if(setError) setError('');

        if(valid === 'num') {
            const num = e.target.value.replace(/\D/g, "")*1;
            /* console.log('valid', num + '/' + valid); */

            if(onChange) {
                onChange(index, e, num, subIndex);
            } else {
                setValue(num);
            }

        } else if(valid === 'float') {
            const num = e.target.value.replace(/[^0-9.]/g, "");
            /* console.log('valid', num + '/' + valid); */

            if(onChange) {
                onChange(index, e, num, subIndex);
            } else {
                setValue(num);
            }

        } else {

            if(onChange) {
                onChange(index, e, e.target.value, subIndex);
            } else {
                setValue(e.target.value);
            }
            
        }
    };

    const withButtonFunc = () => {
        if(withButton === '복사') {
            navigator.clipboard.writeText(value);
        } else if(withButton === "주소찾기") {
            setIsOpenPost(true);
        }
    }
   
    const onCompletePost = (data) => {
        let fullAddr = data.address;
        let extraAddr = '';

        /* console.log('data', data); */
        
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }

        setValue({
            addr: data.address,
            sido: data?.sido,
            sigungu: data?.sigungu || data?.sido
        });
        
        setIsOpenPost(false);
    };
    
    const postBoxStyle = {
        display: 'block',
        position: 'relative',
        width: '100%',
        border: '1px solid #000',
    };
    const postCodeStyle = {
        width: '100%',
        borderTop: '1px solid #000',
    };
    
    return (
        <div className={`input_box ${size ? 'input_box_'+size : ''}`} style={style}>
            {label && 
                <label className="input_label" htmlFor={name}>
                    {label}
                </label>
            }

            <div className={`input_section textarea`}>
                <textarea 
                    type={type} 
                    name={name} 
                    id={name} 
                    className={className + (readOnly ? " disable" : "") + (withButton ? " withButton" : "") + (withText ? " withText" : "") + (search ? ' withSearch' : '')} 
                    placeholder={placeholder} 
                    onChange={handleChange} 
                    onFocus={handleFocus}
                    onBlur={() => {onBlur && onBlur()}}
                    onKeyDown={(e) => {onKeyDown && onKeyDown(e)}}
                    value={value}
                    maxLength={maxlength ? maxlength : 255} 
                    readOnly={readOnly} 
                    autoComplete={autoComplete}
                />    
                {withButton && 
                    <button type="button" className="input_with_button" onClick={() => { withButtonFunc(); withButtonPress && withButtonPress() }}>{withButton}</button>
                }
                {withText &&
                    <span className="input_with_text">{withText}</span>
                }
            </div>

            {error && 
                <p className="input_error animate__animated animate__headShake">{error}</p>
            }

            {success && 
                <p className="input_success">{success}</p>    
            }

            {help && 
                help
            }
        </div>
    )    
}