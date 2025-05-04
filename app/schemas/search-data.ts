import { z } from "zod";

export const searchDataItemSchema = z.object({
	framework: z.string(),
	path: z.string(),
	title: z.string(),
	section: z.object({
		title: z.array(z.string()),
		header: z.string(),
		hash: z.string(),
		content: z.string(),
	}),
});

export const searchDataSchema = z.array(searchDataItemSchema);

export type SearchDataItem = z.infer<typeof searchDataItemSchema>;
export type SearchData = z.infer<typeof searchDataSchema>;
