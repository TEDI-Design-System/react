/**
 * Navigates to a sibling tab in the tablist using ArrowLeft/ArrowRight/Home/End keys.
 * Returns the target tab element if navigation occurred, or null otherwise.
 */
export const navigateTablist = (e: React.KeyboardEvent<HTMLButtonElement>): HTMLButtonElement | null => {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') {
    return null;
  }

  const tablist = e.currentTarget.closest('[role="tablist"]');
  if (!tablist) return null;

  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')).filter(
    (tab) => getComputedStyle(tab).display !== 'none'
  );
  const currentIndex = tabs.indexOf(e.currentTarget);
  if (tabs.length === 0 || currentIndex === -1) return null;
  let newIndex = -1;

  switch (e.key) {
    case 'ArrowLeft':
      newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
      break;
    case 'ArrowRight':
      newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
      break;
    case 'Home':
      newIndex = 0;
      break;
    case 'End':
      newIndex = tabs.length - 1;
      break;
  }

  if (newIndex !== -1) {
    e.preventDefault();
    tabs[newIndex].focus();
    tabs[newIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    return tabs[newIndex];
  }

  return null;
};
