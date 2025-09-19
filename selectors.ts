/**
 * Pure selectors for deriving state slices.
 */
import type { TabbedListStore } from "./store";
import type { PropertySummary } from "./types";

export const selectItems = (s: TabbedListStore) => s.items;
export const selectLoading = (s: TabbedListStore) => s.loading;
export const selectPagination = (s: TabbedListStore) => s.pagination;
export const selectSelectedIds = (s: TabbedListStore) => s.selectedIds;
export const selectActiveTab = (s: TabbedListStore) => s.activeTab;
export const selectDrawer = (s: TabbedListStore) => s.drawer;

export const selectSelectedItems = (s: TabbedListStore) => {
    const set = s.selectedIds;
    return s.items.filter((i: PropertySummary) => set.has(i.id));
};
