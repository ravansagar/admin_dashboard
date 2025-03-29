import { relations } from "drizzle-orm/relations";
import { categories, products } from "./schema";

export const productsRelations = relations(products, ({one}) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	products: many(products),
}));