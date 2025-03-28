import generateUtilityClasses from '@vandlee/utils/generateUtilityClasses';
import generateUtilityClass from '@vandlee/utils/generateUtilityClass';

export interface ListItemAvatarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  alignItemsFlexStart: string;
}

export type ListItemAvatarClassKey = keyof ListItemAvatarClasses;

export function getListItemAvatarUtilityClass(slot: string): string {
  return generateUtilityClass('uiListItemAvatar', slot);
}

const listItemAvatarClasses: ListItemAvatarClasses = generateUtilityClasses('uiListItemAvatar', [
  'root',
  'alignItemsFlexStart',
]);

export default listItemAvatarClasses;
