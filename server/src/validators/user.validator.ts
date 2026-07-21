import { z } from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "firstname must be at least 2 characters long")
      .max(50),

    lastName: z
      .string()
      .trim()
      .min(2, "lastname must be at least 2 characters long")
      .max(50),

    email: z.string().trim().email("Invalid email address"),
    age: z.number().int().min(18, "Age must be at least 18").max(100),

    gender: z.enum(["male", "female", "other"]),
    phone: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "invalid phone number"),

    status: z.enum(["active", "inactive", "blocked"]).default("active"),

    city: z.string().trim().min(2).max(30).optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(2).max(50).optional(),
    lastName: z.string().trim().min(2).max(50).optional(),

    email: z.string().trim().email().optional(),
    age: z.number().int().min(18).max(100).optional(),

    gender: z.enum(["male", "female", "other"]).optional(),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/)
      .optional(),

    status: z.enum(["active", "inactive", "blocked"]).optional(),

    city: z.string().trim().min(2).max(100).optional(),
  }),
});

export const userParamsSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const getUsersQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),
    status: z.enum(["active", "inactive", "blocked"]).optional(),
    city: z.string().optional(),

    sortBy: z
      .enum(["firstName", "lastName", "age", "createdAt"])
      .default("createdAt"),

    order: z.enum(["asc", "desc"]).default("desc"),
  }),
});
export type createUserBody=z.infer<typeof CreateUserSchema>["body"];
export type UpdateUserBody=z.infer<typeof updateUserSchema>["body"];
export type UserParams=z.infer<typeof userParamsSchema>["params"];
export type GetUserQuery=z.infer<typeof getUsersQuerySchema>["query"];
