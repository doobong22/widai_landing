import React, { useEffect, useState, forwardRef } from 'react';
import dayjs from 'dayjs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';

export default function InputDate(props) {
    const { 
        className, 
        placeholder, 
        placeholderEnd,
        type, 
        name, 
        maxlength, 
        dateValue, 
        setDateValue, 
        dateValueEnd, 
        setDateValueEnd, 
        valid, 
        label, 
        error, 
        success, 
        readOnly, 
        multiple,
        index,
        subIndex=null,
        onChange,
        boxCSS,
        ...etc
    } = props;

    const [startDate, setStartDate] = useState(dateValue ? new Date(dateValue) : "");
    const [endDate, setEndDate] = useState(dateValueEnd ? new Date(dateValueEnd) : "");

    const [openState1, setOpenState1] = useState(false);
    const [openState2, setOpenState2] = useState(false);

    useEffect(() => {
        if(dateValue) setStartDate(new Date(dateValue))
    }, [dateValue])

    useEffect(() => {
        if(dateValueEnd) setEndDate(new Date(dateValueEnd))
    }, [dateValueEnd])

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <label className={readOnly ? "input_date_label disable" : openState1 ? "input_date_label focus" : "input_date_label"} onClick={!readOnly ? onClick : console.log("")} ref={ref}>
            <span>{dateValue ? dateValue : placeholder}</span>
        </label>
    ));

    const CustomInputEnd = forwardRef(({ value, onClick }, ref) => (
        <label className={readOnly ? "input_date_label disable" : openState2 ? "input_date_label focus" : "input_date_label"} onClick={!readOnly ? onClick : console.log("")} ref={ref}>
            <span>{dateValueEnd ? dateValueEnd : placeholderEnd}</span>
        </label>
    ));

    const setValueFunc = (date) => {

        let val = dayjs(date).format('YYYY-MM-DD');

        if(onChange) {
            let nm = {target: {name: name}};
            onChange(index, nm, val, subIndex);
        } else {
            setDateValue(val);
        }
    }
   
    return (
        <div className={`input_box date_box ${boxCSS ? boxCSS : ''}`}>
            {label && 
                <label className="input_label" htmlFor={name}>
                    {label}
                </label>
            }

            <div className="input_section">
                {!multiple ? (
                    <DatePicker 
                        selected={startDate} 
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => setValueFunc(date)} 
                        customInput={<CustomInput />}
                        onCalendarClose={() => setOpenState1(false)}
                        onCalendarOpen={() => setOpenState1(true)}
                        showMonthDropdown
                        calendarClassName="wide-calendar"
                    />
                ) : (
                    <div className="input_date_section_multi">
                        <DatePicker 
                            selected={startDate} 
                            locale={ko}
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => setDateValue(dayjs(date).format('YYYY-MM-DD'))} 
                            customInput={<CustomInput />}
                            onCalendarClose={() => setOpenState1(false)}
                            onCalendarOpen={() => setOpenState1(true)}
                            calendarClassName="wide-calendar"
                        />
                        <span>~</span>
                        <DatePicker 
                            selected={endDate} 
                            locale={ko}
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => setDateValueEnd(dayjs(date).format('YYYY-MM-DD'))} 
                            customInput={<CustomInputEnd />}
                            onCalendarClose={() => setOpenState2(false)}
                            onCalendarOpen={() => setOpenState2(true)}
                            calendarClassName="wide-calendar"
                        />
                    </div>
                )}
            </div>

            {error && 
                <p className="input_error">{error}</p>
            }
            
            {success && 
                <p className="input_success">{success}</p>    
            }
        </div>
    )    
}