import { pgTable, serial, text, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 40 }).notNull(),
    imageUrl: text('imageUrl'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 40 }).notNull(),
    description: text('description'),
    imageUrl: text('imageUrl'),
    price: integer('price'),
    initialStock: integer('initialStock').notNull(),
    availableStock: integer('availableStock').notNull(),
    categoryId: integer('categoryId').references(() => categories.id, {
        onDelete: 'set null'
    }),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});

export const productRelations = relations(products, ({ one }) => ({
    category: one(categories, {
        fields: [products.categoryId],
        references: [categories.id],
    }),
}));