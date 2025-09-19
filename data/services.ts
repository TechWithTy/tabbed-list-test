/**
 * Data services for fetching properties and lists. These are UI-agnostic.
 */
import type { FilterSpec, Pagination, SortSpec, PropertySummary } from "../schemas/types";
import { toPropertySummary } from "./adapters";
import { DEFAULT_PAGE_SIZE } from "./constants";

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
	const json: unknown = await res.json();

	// Narrow the API payload shape at runtime
	const hasItems = (v: unknown): v is { items: unknown[]; total?: number } => {
		if (typeof v !== "object" || v === null) return false;
		const obj = v as Record<string, unknown>;
		return Array.isArray(obj.items);
	};
	const isArray = (v: unknown): v is unknown[] => Array.isArray(v);

	const itemsUnknown = hasItems(json) ? json.items : isArray(json) ? json : [];
	const totalUnknown = hasItems(json) && typeof json.total === "number" ? json.total : itemsUnknown.length;

	return {
		items: (itemsUnknown as unknown[]).map((it) => toPropertySummary(it)),
		pagination: {
			page,
			pageSize,
			total: totalUnknown,
		},
	};
}
