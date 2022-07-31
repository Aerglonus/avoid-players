import DataTable from "../components/Table";
import { API_BASE_URL } from "../config";
// import clientPromise from "../lib/mongodb";
export default function Home({ pepegas }) {
	return (
		<>
			<DataTable pepegas={pepegas}></DataTable>
		</>
	);
}
// export async function getServerSideProps(context) {
// 	/* Connecting to the MongoDB database. */
// 	const client = await clientPromise;
// 	/* Connecting to the dictionary database. */
// 	const db = client.db("sample_mflix");
// 	const users = await db.collection("users").find({}).toArray();
// 	/* Converting the data from the database into a JSON object. */
// 	const usersdata = JSON.parse(JSON.stringify(users));
// 	/* Returning the data from the database into the component. */
// 	return {
// 		props: { users: usersdata },
// 	};
// }
export async function getServerSideProps(context) {
	/* Making a call to the API and getting the data from the API. */
	const response = await fetch(`${API_BASE_URL}/api/avoid`);
	/* Destructuring the data from the response.json() call. */
	const { data } = await response.json();

	/* Returning the data from the API call. */
	return {
		props: { pepegas: data },
	};
}
