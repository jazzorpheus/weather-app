// Helper function for scrolling containers in x-direction
export default function horizontalScroll(
  scrollContainerRef,
  direction,
  scrollAmount = 300,
  behavior = "smooth"
) {
  if (!scrollContainerRef || !scrollContainerRef.current) return;

  const amount = direction === "right" ? scrollAmount : -scrollAmount;

  scrollContainerRef.current.scrollBy({
    left: amount,
    behavior,
  });
}
