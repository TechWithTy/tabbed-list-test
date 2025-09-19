import { cn } from "@/lib/_utils";
import type { PropertySummary } from "../schemas/types";
import {
	PropertyImage,
	PropertyAddress,
	PropertyPrice,
	PropertyDetails,
	PropertyBadges,
	PropertySelectionButton,
} from "./PropertyCardPrimitives";

type CardVariant = "list" | "grid" | "compact" | "detailed" | "skeleton";

type CardProps = {
	property: PropertySummary;
	variant: CardVariant;
	isSelected?: boolean;
	onToggleSelect?: (id: string) => void;
	className?: string;
};

export function PropertyCardFactory({
	property,
	variant,
	isSelected = false,
	onToggleSelect,
	className,
}: CardProps) {
	// Common wrapper for all variants
	const CardWrapper = ({ children }: { children: React.ReactNode }) => (
		<div
			className={cn(
				"overflow-hidden rounded-lg border transition-colors",
				isSelected ? "border-primary bg-accent" : "border-border bg-background",
				className,
			)}
		>
			{children}
		</div>
	);

	// Variant: skeleton (loading state)
	if (variant === "skeleton") {
		return (
			<CardWrapper>
				<div className="animate-pulse">
					<div className="h-40 w-full bg-muted" />
					<div className="space-y-2 p-4">
						<div className="h-4 w-3/4 rounded bg-muted" />
						<div className="h-4 w-1/2 rounded bg-muted" />
						<div className="h-4 w-1/4 rounded bg-muted" />
					</div>
				</div>
			</CardWrapper>
		);
	}

	// Variant: compact (e.g., for drawer panels)
	if (variant === "compact") {
		return (
			<CardWrapper>
				<div className="flex items-start justify-between gap-2 p-3">
					<PropertyAddress property={property} />
					{onToggleSelect && (
						<PropertySelectionButton
							isSelected={isSelected}
							onToggle={() => onToggleSelect(property.id)}
						/>
					)}
				</div>
			</CardWrapper>
		);
	}

	// Variant: grid (default)
	if (variant === "grid") {
		return (
			<CardWrapper>
				<PropertyImage imageUrl={property.imageUrl} />
				<div className="p-4">
					<div className="flex items-start justify-between">
						<PropertyAddress property={property} />
						{onToggleSelect && (
							<PropertySelectionButton
								isSelected={isSelected}
								onToggle={() => onToggleSelect(property.id)}
							/>
						)}
					</div>
					<PropertyPrice price={property.price} />
					<PropertyDetails property={property} />
					<PropertyBadges badges={property.badges} />
				</div>
			</CardWrapper>
		);
	}

	// Variant: list (horizontal layout)
	if (variant === "list") {
		return (
			<CardWrapper>
				<div className="flex">
					<div className="w-1/3">
						<PropertyImage imageUrl={property.imageUrl} />
					</div>
					<div className="flex-1 p-4">
						<div className="flex items-start justify-between">
							<PropertyAddress property={property} />
							{onToggleSelect && (
								<PropertySelectionButton
									isSelected={isSelected}
									onToggle={() => onToggleSelect(property.id)}
								/>
							)}
						</div>
						<PropertyPrice price={property.price} />
						<PropertyDetails property={property} />
						<PropertyBadges badges={property.badges} />
					</div>
				</div>
			</CardWrapper>
		);
	}

	// Variant: detailed (more information)
	if (variant === "detailed") {
		return (
			<CardWrapper>
				<PropertyImage imageUrl={property.imageUrl} />
				<div className="p-4">
					<div className="flex items-start justify-between">
						<PropertyAddress property={property} />
						{onToggleSelect && (
							<PropertySelectionButton
								isSelected={isSelected}
								onToggle={() => onToggleSelect(property.id)}
							/>
						)}
					</div>
					<PropertyPrice price={property.price} />
					<PropertyDetails property={property} />
					<div className="mt-2 text-foreground text-sm">
						{property.description && (
							<p className="line-clamp-3">{property.description}</p>
						)}
					</div>
					<PropertyBadges badges={property.badges} />
				</div>
			</CardWrapper>
		);
	}

	// Fallback to grid
	return (
		<CardWrapper>
			<PropertyImage imageUrl={property.imageUrl} />
			<div className="p-4">
				<div className="flex items-start justify-between">
					<PropertyAddress property={property} />
					{onToggleSelect && (
						<PropertySelectionButton
							isSelected={isSelected}
							onToggle={() => onToggleSelect(property.id)}
						/>
					)}
				</div>
				<PropertyPrice price={property.price} />
				<PropertyDetails property={property} />
				<PropertyBadges badges={property.badges} />
			</div>
		</CardWrapper>
	);
}
