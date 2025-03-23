import { z } from "zod";

export const sidebarItemLabelSchema = z.object({
	text: z.string(),
	color: z.string().optional(),
});

export const baseSidebarItemSSchema = z.object({
	title: z.string(),
	slug: z.string(),
	icon: z.string().optional(),
	label: sidebarItemLabelSchema.optional(),
});

export const sidebarItemSchema: z.ZodType<SidebarItem> =
	baseSidebarItemSSchema.extend({
		children: z.lazy(() => z.array(sidebarItemSchema).optional()),
	});

export const frameworkConfigSchema = z.object({
	sidebar: z.array(sidebarItemSchema),
});

export type SidebarItemLabel = z.infer<typeof sidebarItemLabelSchema>;
export type SidebarItem = z.infer<typeof baseSidebarItemSSchema> & {
	children?: SidebarItem[];
};
export type FrameworkConfig = z.infer<typeof frameworkConfigSchema>;
