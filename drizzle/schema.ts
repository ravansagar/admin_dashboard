import { pgTable, serial, varchar, text, timestamp, foreignKey, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const categories = pgTable("categories", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 40 }).notNull(),
	imageUrl: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow(),
});

export const products = pgTable("products", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 40 }).notNull(),
	description: text(),
	initialStock: integer().notNull(),
	categoryId: integer(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow(),
	imageUrl: text(),
	availableStock: integer().notNull(),
	price: integer(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "products_categoryId_categories_id_fk"
		}),
]);
