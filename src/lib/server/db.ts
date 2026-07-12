import 'dotenv/config';

import { env } from '$env/dynamic/private';
import { desc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';

import { itemsTable } from '../../db/schema';

export type Item = {
	id: number;
	title: string;
};

function getDatabase() {
	const databaseUrl = env.DATABASE_URL ?? process.env.DATABASE_URL;
  console.log(databaseUrl)

	if (!databaseUrl) {
		throw new Error('DATABASE_URL não foi configurada.');
	}

	return drizzle({ connection: databaseUrl });
}

export async function listItems(): Promise<Item[]> {
	const database = getDatabase();
	return database.select().from(itemsTable).orderBy(desc(itemsTable.id));
}

export async function createItem(title: string): Promise<void> {
	const database = getDatabase();
	await database.insert(itemsTable).values({ title });
}

export async function updateItem(id: number, title: string): Promise<void> {
	const database = getDatabase();
	await database.update(itemsTable).set({ title }).where(eq(itemsTable.id, id));
}

export async function removeItem(id: number): Promise<void> {
	const database = getDatabase();
	await database.delete(itemsTable).where(eq(itemsTable.id, id));
}