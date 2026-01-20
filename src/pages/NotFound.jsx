import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import routes from "@/libs/routes";

export default function Page() {
	const navigate = useNavigate();
    const location = useLocation();

	useEffect(() => {
		navigate(routes.home);
    }, []);

	return (
		<div className='null_box' style={{ height: '100%' }}>
			<h1>페이지를 찾을 수 없습니다</h1>
		</div>
	)
}