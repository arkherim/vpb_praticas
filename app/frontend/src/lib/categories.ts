import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { apiFetch } from "./api";

export const categorySchema = z.object({
  user_id: z.coerce.number().int().positive(),
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().optional().nullable(),
  is_default: z.boolean().optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export type Category = {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export const categoriesQueryOptions = queryOptions({
  queryKey: ["categories"],
  queryFn: () => apiFetch<Category[]>("/categories"),
});

export const createCategory = (data: CategoryInput) =>
  apiFetch<Category>("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCategory = (
  id: number,
  data: Partial<Pick<CategoryInput, "name" | "description">>,
) =>
  apiFetch<Category>(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteCategory = (id: number) =>
  apiFetch<void>(`/categories/${id}`, { method: "DELETE" });
