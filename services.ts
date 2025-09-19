/**
 * Data services for fetching properties and lists. These are UI-agnostic.
 */
import type { FilterSpec, Pagination, SortSpec, PropertySummary } from "./types";
import { DEFAULT_PAGE_SIZE } from "./constants";
import { z } from "zod";
import { PropertySummarySchema } from "./schemas";

export interface FetchParams {
	page?: number;
	pageSize?: number;
	sort?: SortSpec | null;
	filters?: FilterSpec;
	signal?: AbortSignal;
}

export interface PagedResult<T> {
	items: T[];
	pagination: Pagination;
}

/**
 * Fetch properties from the app API. Base URL comes from NEXT_PUBLIC_API_URL.
 */
export async function fetchProperties(
	params: FetchParams = {},
): Promise<PagedResult<PropertySummary>> {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";
	const page = params.page ?? 0;
	const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;

	const url = new URL(
		`${baseUrl}/properties`,
		typeof window === "undefined" ? "http://localhost" : window.location.origin,
	);
	url.searchParams.set("page", String(page));
	url.searchParams.set("pageSize", String(pageSize));
	if (params.sort) {
		url.searchParams.set("sortField", params.sort.field);
		url.searchParams.set("sortDirection", params.sort.direction);
	}
	if (params.filters?.query) url.searchParams.set("q", params.filters.query);
	if (params.filters?.city) url.searchParams.set("city", params.filters.city);
	if (params.filters?.state)
		url.searchParams.set("state", params.filters.state);

	const res = await fetch(url.toString(), {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		signal: params.signal,
		// cache/revalidate can be managed at callsite if needed
	});
	if (!res.ok) throw new Error(`Failed to fetch properties: ${res.statusText}`);
	const raw = (await res.json()) as unknown;

	// Response can be either an array of items, or an object with items/total
	const ResponseSchema = z.union([
		z.object({ items: z.array(PropertySummarySchema), total: z.number().optional() }),
		z.array(PropertySummarySchema),
	]);

	const parsed = ResponseSchema.parse(raw);
	const items: PropertySummary[] = Array.isArray(parsed) ? parsed : parsed.items;
	const total = Array.isArray(parsed) ? parsed.length : parsed.total ?? parsed.items.length;

	return {
		items,
		pagination: {
			page,
			pageSize,
			total: Number(total),
		},
	};
}
