# Tabbed List Component Suite

Robust tabbed list implementation for React applications featuring state management, validation, and data adapters. Used in www.cybershoptech.com for lead management and workflow organization.

## Overview

This repository provides a comprehensive tabbed list component suite for React applications. With a focus on state management, validation, and data adapters, this suite is perfect for managing complex workflows and lead management systems.

## Files
- `actions.ts`: State management actions
- `adapters.ts`: Data transformation utilities
- `components/`: UI components (TabbedList, ListItem)
- `constants.ts`: Application constants
- `data/`: Sample datasets
- `hooks/`: Custom React hooks
- `index.ts`: Module exports
- `schemas/`: Zod validation schemas
- `schemas.ts`: Schema utilities
- `selectors.ts`: State selectors
- `services.ts`: API communication layer
- `state/`: Redux state slices
- `store.ts`: State store configuration
- `types.ts`: Type definitions
- `utils/`: Helper functions

## Features
- Type-safe tab management
- Configurable list items
- State persistence
- Data validation
- Responsive design

## Usage
```typescript
import { TabbedList, useTabbedListState } from '@/external/tabbed-list-test';

const tabs = [{ id: 'all', label: 'All Items' }];
const items = [{ id: '1', content: 'List Item' }];

function Component() {
  const { activeTab, setActiveTab } = useTabbedListState();
  
  return (
    <TabbedList 
      tabs={tabs} 
      items={items}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}
```

## Tags
react, tabbed-interface, state-management, zustand, typescript, ui-components, data-adapters, cybershoptech, lead-management, workflow-organization
