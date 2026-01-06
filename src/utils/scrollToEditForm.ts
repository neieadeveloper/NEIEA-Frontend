/**
 * Utility function to scroll to an edit form element
 * @param ref - React ref to the edit form element
 * @param delay - Optional delay in milliseconds before scrolling (default: 100)
 */
export const scrollToEditForm = (ref: React.RefObject<HTMLElement>, delay: number = 100) => {
  setTimeout(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, delay);
};

