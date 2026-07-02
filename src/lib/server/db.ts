import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

export type Item = {
	id: number;
	title: string;
};

const dataDirectory = join(process.cwd(), 'data');
mkdirSync(dataDirectory, { recursive: true });

const databaseFile = join(dataDirectory, 'crud.sqlite');
const database = new Database(databaseFile);

database.pragma('journal_mode = WAL');
database.exec(`
	CREATE TABLE IF NOT EXISTS items (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL
	)
`);

const listItemsStatement = database.prepare('SELECT id, title FROM items ORDER BY id DESC');
const createItemStatement = database.prepare('INSERT INTO items (title) VALUES (?)');
const updateItemStatement = database.prepare('UPDATE items SET title = ? WHERE id = ?');
const deleteItemStatement = database.prepare('DELETE FROM items WHERE id = ?');

export function listItems(): Item[] {
	return listItemsStatement.all() as Item[];
}

export function createItem(title: string): void {
	createItemStatement.run(title);
}

export function updateItem(id: number, title: string): void {
	updateItemStatement.run(title, id);
}

export function removeItem(id: number): void {
	deleteItemStatement.run(id);
}