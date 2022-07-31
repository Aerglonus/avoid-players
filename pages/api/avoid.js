import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
	switch (req.method) {
		case "GET": {
			return getUsers(req, res);
		}
		case "POST": {
			return addUser(req, res);
		}
		case "PUT": {
			return updateUser(req, res);
		}
		case "DELETE": {
			return deleteUser(req, res);
		}
	}
}
async function getUsers(req, res) {
	const client = await clientPromise;
	const db = client.db("league_users");
	const data = await db.collection("pepegas").find({}).toArray();
	res.json({ status: 200, data: data });
}
async function addUser(req, res) {
	const client = await clientPromise;
	const db = client.db("league_users");
	let bodyObject = JSON.parse(req.body);
	await db.collection("pepegas").insertOne(bodyObject);
	res.json({ status: 200 });
}

async function deleteUser(req, res) {
	const client = await clientPromise;
	const db = client.db("league_users");
	const id = req.query.id;
	const data = await db
		.collection("pepegas")
		.deleteOne({ _id: ObjectId(`${id}`) });
	res.json({ status: 200, data: data });
}
