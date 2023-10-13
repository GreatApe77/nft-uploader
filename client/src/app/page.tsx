"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { postForm } from "./api-calls/postForm";
import { auth } from "./config/firebase-config";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import Spinner from "react-bootstrap/Spinner";
export default function Home() {
	const [name, setName] = useState("");
	const [isAuth, setIsAuth] = useState(false);
	const [user, setUser] = useState<User>();
	const [description, setDescription] = useState("");
	const [wallet, setWallet] = useState("");
	const [image, setImage] = useState<File>();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		auth.onAuthStateChanged((userCred) => {
			if (userCred) {
				setIsAuth(true);
				setUser(userCred);
			}
		});
	}, []);
	function loginWithGoogle() {
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((result) => {
				console.log(result);
				setIsAuth(true);
			})
			.catch((err) => {
				console.error(err);
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
		postForm({ name, description, image: image! }, wallet)
			.then((result) => {
				alert(result.status);
			})
			.catch((err) => {
				alert("Something wrong with the origin server");
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
					<p className="col-lg-10 fs-4">
						<button type="button" className="btn btn-outline-success">
							Login com Google
						</button>
					</p>
				</div>
				<div className="col-md-10 mx-auto col-lg-5">
					<form onSubmit={handleFormSubmit} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
						<div className="form-floating mb-2">
							<input
								type="text"
								className="form-control"
								id="floatingInput"
								value={name}
								onChange={handleNameChange}
								required
							/>
							<label htmlFor="floatingInput">The name of your NFT</label>
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
							<label htmlFor="floatingInput">Small Description</label>
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
							<label htmlFor="floatingInput">Your Wallet Address</label>
						</div>
						<div className="mb-3">
							<label htmlFor="" className="form-label">
								Escolha a Imagem!
							</label>
							<input
								type="file"
								className="form-control"
								name=""
								id=""
								placeholder=""
								aria-describedby="fileHelpId"
								onChange={handleFileChange}
								
								required
							/>
						</div>

						<button className="w-100 btn btn-lg btn-primary" disabled={loading} type="submit">
							{loading ? <Spinner /> : "Mintar NFT"}
						</button>
						<hr className="my-4" />
						<small className="text-body-secondary">
							By clicking Sign up, you agree to the terms of use.
						</small>
					</form>
				</div>
			</div>
		</main>
	);
}
