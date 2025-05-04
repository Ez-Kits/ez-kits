import { z } from "zod";

export const libraryFeatureSchema = z.object({
	title: z.string(),
	description: z.string(),
	icon: z.string().optional(),
});

export const libraryFeaturesSchema = z.array(libraryFeatureSchema);

export type LibraryFeature = z.infer<typeof libraryFeatureSchema>;
export type LibraryFeatures = z.infer<typeof libraryFeaturesSchema>;
