import mockData from "@/mock-data.json";
import type { PortfolioData, ProjectsPage } from "./types";

const data = mockData as PortfolioData;

export async function getPortfolioData(): Promise<PortfolioData> {
  return data;
}

export async function getProjectsPage(
  page: number,
  pageSize: number
): Promise<ProjectsPage> {
  const all = data.projects;
  const start = (page - 1) * pageSize;
  const items = all.slice(start, start + pageSize);
  return {
    items,
    page,
    pageSize,
    total: all.length,
    hasMore: start + pageSize < all.length,
  };
}
