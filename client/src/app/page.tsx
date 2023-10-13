"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { postForm } from "./api-calls/postForm";
import { auth } from "./config/firebase-config";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";

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
		<main>
			<div className="container col-xl-10 col-xxl-8 px-4 py-5" />
			<div className="row align-items-center g-lg-5 py-5">
				<div className="col-lg-7 text-center text-lg-start">
					<h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
						Vertically centered hero sign-up form
					</h1>
					<p className="col-lg-10 fs-4">
						Below is an example form built entirely with Bootstrap’s form
						controls. Each required form group has a validation state that can
						be triggered by attempting to submit the form without completing it.
					</p>
				</div>
				<div className="col-md-10 mx-auto col-lg-5">
					<form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
						<div className="form-floating mb-3">
							<input
								type="email"
								className="form-control"
								id="floatingInput"
								placeholder="name@example.com"
							/>
							<label htmlFor="floatingInput">Email address</label>
						</div>
						<div className="form-floating mb-3">
							<input
								type="password"
								className="form-control"
								id="floatingPassword"
								placeholder="Password"
							/>
							<label htmlFor="floatingPassword">Password</label>
						</div>
						<div className="checkbox mb-3">
							<label>
								<input type="checkbox" value="remember-me" /> Remember me
							</label>
						</div>
						<button className="w-100 btn btn-lg btn-primary" type="submit">
							Sign up
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
