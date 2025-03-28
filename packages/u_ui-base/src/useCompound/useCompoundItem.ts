'use client';
import * as React from 'react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@vandlee/utils';
import {
  CompoundComponentContext,
  CompoundComponentContextValue,
  KeyGenerator,
} from './useCompoundParent';

export interface UseCompoundItemReturnValue<Key> {
  /**
   * The unique key for the child component.
   * If the id was provided to `useCompoundItem`, this will be the same value.
   * Otherwise, this will be a value generated by the `id` function.
   */
  id: Key | undefined;
  /**
   * The 0-based index of the child component in the parent component's list of registered children.
   */
  index: number;
  /**
   * The total number of child components registered with the parent component.
   * This value will be correct after the effect phase of the component (as children are registered with the parent during the effect phase).
   */
  totalItemCount: number;
}

/**
 * Registers a child component with the parent component.
 *
 * @param id A unique key for the child component. If the `id` is `undefined`, the registration logic will not run (this can sometimes be the case during SSR).
 *   This can be either a value, or a function that generates a value based on already registered siblings' ids.
 *   If a function, it's called with the set of the ids of all the items that have already been registered.
 *   Return `existingKeys.size` if you want to use the index of the new item as the id.
 * @param itemMetadata Arbitrary metadata to pass to the parent component. This should be a stable reference (for example a memoized object), to avoid unnecessary re-registrations.
 *
 * @ignore - internal hook.
 */
export function useCompoundItem<Key, Subitem>(
  id: Key | KeyGenerator<Key>,
  itemMetadata: Subitem,
): UseCompoundItemReturnValue<Key> {
  const context = React.useContext(CompoundComponentContext) as CompoundComponentContextValue<
    Key,
    Subitem
  >;

  if (context === null) {
    throw new Error('useCompoundItem must be used within a useCompoundParent');
  }

  const { registerItem } = context;
  const [registeredId, setRegisteredId] = React.useState(typeof id === 'function' ? undefined : id);

  useEnhancedEffect(() => {
    const { id: returnedId, deregister } = registerItem(id, itemMetadata);
    setRegisteredId(returnedId);
    return deregister;
  }, [registerItem, itemMetadata, id]);

  return {
    id: registeredId,
    index: registeredId !== undefined ? context.getItemIndex(registeredId) : -1,
    totalItemCount: context.totalSubitemCount,
  };
}
