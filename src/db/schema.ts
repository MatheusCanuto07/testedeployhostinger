import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const itemsTable = mysqlTable('items', {
	id: int('id').primaryKey().autoincrement(),
	title: varchar('title', { length: 255 }).notNull()
});
