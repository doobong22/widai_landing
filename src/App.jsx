import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContextMenu from "@/components/ContextMenu";

// stores_components
import Loading from "@/store/components/Loading";
import Popup from "@/store/components/Popup";

// 페이지
import NotFound from '@/pages/NotFound';

import Home from '@/pages/mainHome/home';





function App() {
	const navigate = useNavigate();
	const location = useLocation();

	/* useEffect(() => {
		toast('asdasdasdasd');

		const id = toast.loading("Please wait...");

		setTimeout(() => {
			// toast.update(id, { render: '정상 처리 되었습니다.', type: "success",  ...consts.toastOption});
			toast.update(id, { render: '실패 처리 되었습니다.', type: "error",  ...consts.toastOption});
		}, 2000)

	}, []) */

	const handleEvent = ({ key, idx, target }) => {
		console.log('id,', key, idx, target);
	}

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>


			<ToastContainer
				position="bottom-center"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				draggable
				theme="light"
			/>
		</>
	)
}

export default App
