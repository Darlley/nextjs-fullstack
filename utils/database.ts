/* eslint-disable prettier/prettier */
import { MongoClient, Db } from 'mongodb';

const DBConnection = process.env.DATABASE_URL;

const client = new MongoClient(DBConnection, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

interface ConnectType {
	db: Db;
	client: MongoClient;
}

export default async function connect(): Promise<ConnectType> {
	await client.connect();

	const db = client.db('teach-other');

	return {
		db,
		client
	};
}