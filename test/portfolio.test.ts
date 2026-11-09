import { test } from "node:test";
import assert from "node:assert/strict";
import { filterProjects, getActiveSection } from "../src/lib/portfolio.ts";

test("getActiveSection: empty list returns empty string", () => {
  assert.equal(getActiveSection([], 500), "");
});

test("getActiveSection: picks the last section whose top has passed", () => {
  const sections = [
    { id: "top", top: 0 },
    { id: "work", top: 800 },
    { id: "about", top: 1600 },
  ];
  assert.equal(getActiveSection(sections, 0), "top");
  // 700 + 140 offset = 840 -> work
  assert.equal(getActiveSection(sections, 700), "work");
  // 1500 + 140 = 1640 -> about
  assert.equal(getActiveSection(sections, 1500), "about");
});

test("getActiveSection: offset boundary is inclusive", () => {
  const sections = [{ id: "work", top: 800 }];
  assert.equal(getActiveSection(sections, 660), "work"); // 660+140 === 800
  assert.equal(getActiveSection(sections, 659), ""); // one short
});

test("filterProjects: All returns the original list", () => {
  const projects = [
    { id: "a", category: "Frontend" },
    { id: "b", category: "Mobile" },
  ];
  assert.equal(filterProjects(projects, "All"), projects);
});

test("filterProjects: matches by category, unknown yields empty", () => {
  const projects = [
    { id: "a", category: "Frontend" },
    { id: "b", category: "Mobile" },
    { id: "c", category: "Mobile" },
  ];
  assert.deepEqual(
    filterProjects(projects, "Mobile").map((p) => p.id),
    ["b", "c"],
  );
  assert.equal(filterProjects(projects, "Backend").length, 0);
});
