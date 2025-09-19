import type { PropertySummary } from "../schemas/types";

// Primitive components for building property cards
export function PropertyImage({ imageUrl }: { imageUrl?: string }) {
	return (
		<div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
			{imageUrl ? (
				<img
					src={imageUrl}
					alt="Property"
					className="h-full w-full object-cover"
					onError={(e) => {
						e.currentTarget.style.display = "none";
					}}
				/>
			) : (
				<div className="flex h-full w-full items-center justify-center border-border bg-muted">
					<span className="text-muted-foreground text-sm">No image</span>
				</div>
			)}
		</div>
	);
}

export function PropertyAddress({ property }: { property: PropertySummary }) {
	return (
		<div>
			<h3 className="truncate font-medium text-foreground">
				{property.addressLine}
			</h3>
			<p className="truncate text-muted-foreground text-sm">
				{property.city}, {property.state} {property.zip}
			</p>
		</div>
	);
}

export function PropertyPrice({ price }: { price?: number }) {
	if (typeof price !== "number") return null;
	return (
		<div className="font-semibold text-foreground">
			${price.toLocaleString()}
		</div>
	);
}

export function PropertyDetails({ property }: { property: PropertySummary }) {
	return (
		<div className="flex gap-4 text-muted-foreground text-sm">
			{property.beds && <span>{property.beds} bd</span>}
			{property.baths && <span>{property.baths} ba</span>}
			{property.sqft && <span>{property.sqft.toLocaleString()} sqft</span>}
		</div>
	);
}

export function PropertyBadges({ badges }: { badges?: string[] }) {
	if (!badges?.length) return null;
	return (
		<div className="mt-2 flex flex-wrap gap-1">
			{badges.map((badge) => (
				<span
					key={badge}
					className="rounded-full border border-border bg-accent px-2 py-1 text-accent-foreground text-xs"
				>
					{badge}
				</span>
			))}
		</div>
	);
}

export function PropertySelectionButton({
	isSelected,
	onToggle,
}: {
	isSelected: boolean;
	onToggle: () => void;
}) {
	// Minimal classnames combiner
	function cn(...classes: Array<string | false | null | undefined>): string {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<button
			type="button"
			onClick={onToggle}
			className={cn(
				"flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
				isSelected
					? "border-primary bg-primary"
					: "border-border bg-background",
			)}
		>
			{isSelected && (
				<svg
					xmlns="http://www.w3.org/2000"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="h-3 w-3 text-primary-foreground"
					aria-hidden="true"
					focusable="false"
				>
					<path
						fillRule="evenodd"
						d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
						clipRule="evenodd"
					/>
				</svg>
			)}
		</button>
	);
}
