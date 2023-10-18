"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
	TransactionResponse as TxResponse,
	postForm,
} from "./api-calls/postForm";
import TransactionResponse from "./components/TransactionResponse";
import { auth } from "./config/firebase-config";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
	const [name, setName] = useState("");
	const [authLoading, setAuthLoading] = useState(false);

	const [user, setUser] = useState<User>();
	const [description, setDescription] = useState("");
	const [wallet, setWallet] = useState("");
	const [image, setImage] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [transactionResponse, setTransactionresponse] = useState<TxResponse>();
	
	
	useEffect(() => {
		auth.onAuthStateChanged((userCred) => {
			if (userCred) {
				setUser(userCred);
			}
		});
		
	}, []);
	
	function loginWithGoogle() {
		setAuthLoading(true);
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setAuthLoading(false);
			});
	}
	function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setName(e.target.value);
	}
	function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
		setDescription(e.target.value);
	}
	function handleWalletChange(e: React.ChangeEvent<HTMLInputElement>) {
		setWallet(e.target.value);
	}
	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		setImage(e.target.files![0]);
	}

	function handleFormSubmit(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		postForm({ name, description, image: image! }, wallet, user)
			.then((result) => {
				if (result.status === 200) {
					toast.success("NFT Criado com Sucesso!", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
					console.log(result);
					setTransactionresponse(result);
				} else {
					toast.error("Ocorreu algum erro");
				}
			})
			.catch((err) => {
				console.error(err);
				toast.warning("Não estou conseguindo chamar o servidor!", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			})
			.finally(() => {
				setLoading(false);
				setDescription("");
				setImage(undefined);
				setName("");
				setWallet("");
			});

		console.log({
			name,
			description,
			image,
			wallet,
		});
	}
	return (
		<main className="p-5">
			<div className="container col-xl-10 col-xxl-8 px-4 py-5" />
			<div className="row align-items-center g-lg-5 py-5">
				<div className="col-lg-7 text-center text-lg-start">
					<h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
						Crie NFTS!
					</h1>
					<p className="col-lg-10 fs-4">
						Digite as informçoes ao lado para realizar Criar um NFT com uma foto
						de sua escolha
					</p>

					{user?.displayName ? (
						<p className="col-lg-10 fs-4">Bem vindo(a) {user.displayName} !</p>
					) : (
						<p className="col-lg-10 fs-4">
							<button
								onClick={loginWithGoogle}
								disabled={authLoading}
								type="button"
								className="btn btn-outline-success"
							>
								{authLoading ? <Spinner /> : "Login with Google"}
							</button>
						</p>
					)}
					
					{ethereum! ? <p className="col-lg-10 fs-4">
						
					</p> : <></>}
				</div>
				<div className="col-md-10 mx-auto col-lg-5">
					<form
						onSubmit={handleFormSubmit}
						className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
					>
						<div className="form-floating mb-2">
							<input
								type="text"
								className="form-control"
								id="floatingInput"
								value={name}
								onChange={handleNameChange}
								required
							/>
							<label htmlFor="floatingInput">O nome que você deseja</label>
						</div>
						<div className="form-floating mb-2">
							<input
								type="text"
								className="form-control"
								id="floatingInput"
								value={description}
								onChange={handleDescriptionChange}
								required
							/>
							<label htmlFor="floatingInput">Uma pequena descrição</label>
						</div>
						<div className="form-floating mb-2">
							<input
								type="text"
								className="form-control"
								id="floatingInput"
								value={wallet}
								onChange={handleWalletChange}
								required
							/>
							<label htmlFor="floatingInput">
								Seu endereço de carteira ethereum
							</label>
						</div>
						<div className="mb-3">
							<label htmlFor="image" className="form-label">
								Escolha a Imagem!
							</label>
							<input
								type="file"
								className="form-control"
								name=""
								id="image"
								placeholder=""
								aria-describedby="fileHelpId"
								onChange={handleFileChange}
								required
							/>
						</div>

						<button
							className="w-100 btn btn-lg btn-primary"
							disabled={loading}
							type="submit"
						>
							{loading ? <Spinner /> : "Mintar NFT"}
						</button>
						<hr className="my-4" />
						<small className="text-body-secondary">
							{transactionResponse?.status === 200 ? (
								<TransactionResponse
									status={transactionResponse.status}
									data={transactionResponse.data}
								/>
							) : (
								"Sua Transação aparecerá aqui!"
							)}
						</small>
					</form>
				</div>
			</div>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</main>
	);
}
