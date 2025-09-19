/**
 * Pure selectors for deriving state slices from TabbedList store.
 */
import type { TabbedListStore } from "./store";
import type { PropertySummary } from "../schemas/types";

export const selectItems = (s: TabbedListStore) => s.items;
export const selectLoading = (s: TabbedListStore) => s.loading;
export const selectPagination = (s: TabbedListStore) => s.pagination;
export const selectSelectedIds = (s: TabbedListStore) => s.selectedIds;
export const selectActiveTab = (s: TabbedListStore) => s.activeTab;
export const selectDrawer = (s: TabbedListStore) => s.drawer;

export const selectSelectedItems = (s: TabbedListStore) => {
    const set = s.selectedIds;
    // Let TypeScript infer the item type from the store to avoid cross-module type mismatches
    return s.items.filter((i) => set.has(i.id));
};
