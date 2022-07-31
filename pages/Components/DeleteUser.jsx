import React from "react";
import { Table, Input, Button } from "@nextui-org/react";

const DeleteUser = (id) => {
	async function handleDelete(id) {
		let res = await fetch(`http://localhost:3000/api/evade?id=${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			refreshData();
		}
	}

	return (
		<div>
			<Button onClick={(e) => handleDelete(users._id)} className="bg-red-500">
				DELETE
			</Button>
		</div>
	);
};

export default DeleteUser;
