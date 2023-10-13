"use client";

import React, { useState } from "react";
import { postForm } from "./api-calls/postForm";


import {  auth} from "./config/firebase-config"


import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";





export default function Home() {
	const [name, setName] = useState("");

	const [description, setDescription] = useState("");
	const [wallet, setWallet] = useState("");
	const [image, setImage] = useState<File>();
  	const [loading,setLoading] = useState(false)
	console.log(GoogleAuthProvider)
	function loginWithGoogle(){
		signInWithPopup(auth,new GoogleAuthProvider()).then((result) => {
			console.log(result)
		}).catch((err) => {
			
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
    setLoading(true)
    postForm({name,description,image:image!},wallet)
    .then((result) => {
      alert(result.status)
    }).catch((err) => {
      alert("Something wrong with the origin server")
    }).finally(()=>{
      setLoading(false)
      setDescription("")
      setImage(undefined)
      setName("")
      setWallet("")
    })
    
		console.log({
			name,
			description,
			image,
			wallet,
		})
	}
	return (
		<main className="min-h-full flex flex-grow justify-center items-center ">
			<div className="flex flex-col p-6 rounded border bg-stone-300 ">
				<form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
					<h1 className="text-4xl">Provide the info</h1>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={handleNameChange}
						className="p-1 rounded bg-neutral-200"
						id="name"
            required
					/>
					<label htmlFor="description">description</label>
					<input
						type="text"
						id="description"
						name="description"
						value={description}
						onChange={handleDescriptionChange}
						className="p-1 rounded bg-neutral-200"
            required
          />
					<label htmlFor="wallet"> Your public address:</label>
					<input
						type="text"
						id="wallet"
						className="p-1 rounded bg-neutral-200"
						value={wallet}
						onChange={handleWalletChange}
            required
          />
					<label
						htmlFor="file"
						className=" rounded bg-slate-50 flex w-full  items-center"
					>
						<div className=" border-solid border-r p-3 bg-zinc-200 border-gray-500 cursor-pointer ">
							{" "}
							Image
						</div>
						<div className="flex justify-center m-auto">
							{image?.name ? image.name : "Input your image here"}
						</div>
					</label>
					<input
						type="file"
						onChange={handleFileChange}
						name="file"
						id="file"
						className="hidden"
            required
					/>
					<button
						type="submit"
						className={`bg-indigo-800 text-2xl p-2 rounded text-white hover:bg-indigo-600 transition-all `+`${loading?("bg-indigo-400"):("")}`}
            disabled={loading}
          >
						{loading?("Minting..."):("Mint")}
					</button>
				</form>
			</div>
			<button className="p-2 bg-slate-400" onClick={loginWithGoogle}>Login With Google</button>
		</main>
	);
}
