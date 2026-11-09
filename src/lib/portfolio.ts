/** Pure helpers for the portfolio. Kept React-free so they can be tested with node:test. */

export type SectionOffset = { id: string; top: number };

/** Section whose top has passed the scroll position (plus a navbar offset). */
export function getActiveSection(
  sections: readonly SectionOffset[],
  y: number,
  offset = 140,
): string {
  const pos = y + offset;
  let current = "";
  for (const section of sections) {
    if (section.top <= pos) current = section.id;
  }
  return current;
}

/** Filter projects by category. "All" returns the list untouched. */
export function filterProjects<T extends { category: string }>(
  projects: readonly T[],
  filter: string,
): readonly T[] {
  return filter === "All"
    ? projects
    : projects.filter((project) => project.category === filter);
}