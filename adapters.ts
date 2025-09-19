/**
 * Adapters map external API shapes to our PropertySummary domain model.
 */
import type { PropertySummary } from "./types";
import { PropertySummarySchema } from "./schemas";

interface RawPropertyInput {
	id?: string | number;
	propertyId?: string | number;
	_id?: string | number;
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
	badges?: unknown;
	aiScore?: number;
	createdAt?: string;
}
/**
 * Map any backend property object to PropertySummary. Extend as needed.
 */
export function toPropertySummary(input: RawPropertyInput): PropertySummary {
	const candidate = {
		id: String(input.id ?? input.propertyId ?? input._id),
		addressLine:
			input.addressLine ??
			input.address?.fullStreetLine ??
			input.address?.street ??
			"Unknown address",
		city: input.city ?? input.address?.city ?? "",
		state: input.state ?? input.address?.state ?? "",
		zip: input.zip ?? input.address?.zipCode ?? "",
		price: input.price ?? input.metadata?.listPrice,
		beds: input.details?.beds ?? input.beds,
		baths: input.details?.fullBaths ?? input.baths,
		sqft: input.details?.sqft ?? input.sqft,
		lotSqft: input.details?.lotSqft ?? input.lotSqft,
		imageUrl: input.media?.images?.[0]?.url ?? input.primary_photo ?? undefined,
		badges: input.badges,
		aiScore: input.aiScore,
		createdAt: input.createdAt ?? input.metadata?.listDate,
	};
	return PropertySummarySchema.parse(candidate);
}
