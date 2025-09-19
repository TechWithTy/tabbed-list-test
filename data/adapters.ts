/**
 * Adapters map external API shapes to our PropertySummary domain model.
 */
import type { PropertySummary } from "../schemas/types";
import { PropertySummarySchema } from "../schemas/schemas";

/**
 * Map any backend property object to PropertySummary. Extend as needed.
 */
// Define a type for the input structure that can accommodate various API response formats
interface PropertyApiResponse {
	id?: string | number;
	propertyId?: string;
	_id?: string;
	addressLine?: string;
	address?: {
		fullStreetLine?: string;
		street?: string;
		city?: string;
		state?: string;
		zipCode?: string;
	};
	city?: string;
	state?: string;
	zip?: string;
	price?: number;
	metadata?: {
		listPrice?: number;
		listDate?: string;
	};
	details?: {
		beds?: number;
		fullBaths?: number;
		sqft?: number;
		lotSqft?: number;
	};
	beds?: number;
	baths?: number;
	sqft?: number;
	lotSqft?: number;
	media?: {
		images?: Array<{ url?: string }>;
	};
	primary_photo?: string;
	badges?: Array<{ label?: string }>;
	aiScore?: number;
	createdAt?: string;
	description?: string;
}

export function toPropertySummary(input: unknown): PropertySummary {
	// Type guard to check if input is an object
	if (typeof input !== "object" || input === null) {
		throw new Error("Invalid input: expected an object");
	}
	
	const propertyInput = input as PropertyApiResponse;
	
	const candidate = {
		id: String(propertyInput.id ?? propertyInput.propertyId ?? propertyInput._id),
		addressLine:
			propertyInput.addressLine ??
			propertyInput.address?.fullStreetLine ??
			propertyInput.address?.street ??
			"Unknown address",
		city: propertyInput.city ?? propertyInput.address?.city ?? "",
		state: propertyInput.state ?? propertyInput.address?.state ?? "",
		zip: propertyInput.zip ?? propertyInput.address?.zipCode ?? "",
		price: propertyInput.price ?? propertyInput.metadata?.listPrice,
		beds: propertyInput.details?.beds ?? propertyInput.beds,
		baths: propertyInput.details?.fullBaths ?? propertyInput.baths,

		sqft: propertyInput.details?.sqft ?? propertyInput.sqft,
		lotSqft: propertyInput.details?.lotSqft ?? propertyInput.lotSqft,
		imageUrl: propertyInput.media?.images?.[0]?.url ?? propertyInput.primary_photo ?? undefined,
		// Extract label strings and filter out undefined; omit if none
		badges: Array.isArray(propertyInput.badges)
			? propertyInput.badges
					.map((b) => b?.label)
					.filter((v): v is string => typeof v === "string")
			: undefined,
		aiScore: propertyInput.aiScore,
		createdAt: propertyInput.createdAt ?? propertyInput.metadata?.listDate,
		description: propertyInput.description,
	};
	return PropertySummarySchema.parse(candidate);
}
