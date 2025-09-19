/**
 * useDrawerController: minimal hook for opening/closing drawer from UI components.
 */
import { useTabbedListStore } from "../state/store";
import type { PropertySummary } from "../schemas/types";

export function useDrawerController() {
	const open = useTabbedListStore((s) => s.drawer.open);
	const item = useTabbedListStore((s) => s.drawer.currentItem);

	return {
		open,
		item,
		openWith: (it: PropertySummary) => useTabbedListStore.getState().openDrawer(it),
		close: () => useTabbedListStore.getState().closeDrawer(),
	};
}
