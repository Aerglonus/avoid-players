import React, { useState } from "react";
import { useRouter } from "next/router";
// import clientPromise from "../../lib/mongodb";
import { Table, Input, Button } from "@nextui-org/react";
import { DeleteIcon } from "../../components/DeleteIcon";

const DeleteUser = ({ pepegas }) => {
	const router = useRouter();
	const refreshData = () => {
		router.replace(router.asPath);
	};
	async function handleDelete(id) {
		try {
			const res = await fetch(`api/avoid?id=${id}`, {
				method: "DELETE",
			});
			if (res.ok) {
				refreshData();
			}
		} catch (error) {
			if (error.name === "AbortErro") return;
			console.log("Error", error);
		}
	}
	return (
		<>
			{/* <Button  className="bg-red-500">
				DELETE
			</Button> */}
			<DeleteIcon
				className="cursor-pointer"
				onClick={(e) => handleDelete(pepegas._id)}
				size={20}
				fill="#FF0080"></DeleteIcon>
		</>
	);
};

const AddUser = () => {
	const router = useRouter();
	const refreshData = () => {
		router.replace(router.asPath);
	};
	const [user, setUser] = useState("");
	const [elos, setElos] = useState("");
	const [loading, setLoading] = useState(false);
	const chars =
		"0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const passwordLength = 64;
	const begpass = "$";
	let password = "";
	for (let i = 0; i <= passwordLength; i++) {
		let randomNumber = Math.floor(Math.random() * chars.length);
		password += chars.substring(randomNumber, randomNumber + 1);
	}

	async function submitForm(e) {
		e.preventDefault();
		setLoading(true);
		const res = await fetch("/api/avoid", {
			method: "POST",
			body: JSON.stringify({
				username: user,
				elo: elos,
				password: begpass + password,
				Created: Date(),
			}),
		});
		if (res.ok) {
			setLoading(false);
			setUser("");
			setElos("");
			refreshData();
		}
	}
	return (
		<div className=" flex flex-col justify-around gap-y-5 bg-white shadow-xl shadow-[#f5f6f6]-500/50 px-10 pb-5 pt-5 rounded-xl">
			<form onSubmit={submitForm}>
				<div className="form-group my-5 flex-col flex">
					<Input
						bordered
						label="Username"
						color="secondary"
						placeholder="Enter username"
						helperText="Add the pepega's Username	"
						clearable
						onChange={(e) => setUser(e.target.value)}
						value={user}
						aria-label="input"></Input>
				</div>
				<div className="form-group my-10 flex-col flex">
					<Input
						bordered
						color="secondary"
						helperText="Add the pepega's ELO"
						placeholder="Enter ELO"
						label="ELO"
						clearable
						onChange={(e) => setElos(e.target.value)}
						value={elos}
						aria-label="input"></Input>
				</div>
				<div>
					<Button
						disabled={loading ? true : false}
						type="submit"
						className="bg-[#7828c8]">
						{loading ? "Add" : "Add"}
					</Button>
				</div>
			</form>
		</div>
	);
};

const DataTable = ({ pepegas }) => {
	const [search, setSearch] = useState("");
	const keys = ["username", "elo"];

	return (
		<div className="mx-20 w-auto h-auto">
			<div className="mt-[20px] flex justify-center items-center flex-col">
				<Input
					width="400px"
					clearable
					aria-label="search"
					onChange={(a) => setSearch(a.target.value)}
					placeholder="Search"></Input>
			</div>
			<div>
				<div className="flex flex-col justify-center items-center w-full m-auto mt-3	">
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-2xl font-bold">Add users to avoid</h1>
					</div>
					<AddUser></AddUser>
				</div>
				<div className=" 2xl:m-0 xl:mt-[10px] pt-10 m-2">
					<Table aria-label="table" borderWeight="0px" color="secondary">
						<Table.Header>
							<Table.Column css={{ paddingLeft: "10px" }}>USERNAME</Table.Column>
							<Table.Column css={{ paddingLeft: "20px", fontWeight: "bold" }}>
								{" "}
								ELO
							</Table.Column>
							<Table.Column
								css={{
									paddingLeft: "10px",
									display: "flex",
									justifyContent: "flex-end",
									alignItems: "center",
									fontWeight: "bold",
								}}>
								DELETE{" "}
							</Table.Column>
						</Table.Header>
						<Table.Body>
							{pepegas
								.filter((item) => {
									return search.toLowerCase() === ""
										? item
										: keys.some((key) => item[key].toLowerCase().includes(search));
								})
								.map((users) => {
									return (
										<Table.Row key={users._id}>
											<Table.Cell css={{ paddingLeft: "10px", fontWeight: "bold" }}>
												<span className="text-black">
													{users.username.charAt(0).toUpperCase() + users.username.slice(1)}
												</span>
											</Table.Cell>
											<Table.Cell css={{ paddingLeft: "10px", fontWeight: "bold" }}>
												<span className="text-black ">
													{users.elo.charAt(0).toUpperCase() + users.elo.slice(1)}
												</span>
											</Table.Cell>
											<Table.Cell
												css={{
													paddingLeft: "10px",
													justifyContent: "end",
													display: "flex",
												}}>
												<DeleteUser pepegas={users}></DeleteUser>
											</Table.Cell>
										</Table.Row>
									);
								})}
						</Table.Body>
						<Table.Pagination
							shadow
							noMargin
							align="center"
							rowsPerPage={4}
							onPageChange={(page) => console.log({ page })}
						/>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default DataTable;
