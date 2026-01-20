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
			<h1>Page Not Found!</h1>
			<button onClick={() => {
				navigate("/")
			}}>go main</button>
		</div>
	)
}