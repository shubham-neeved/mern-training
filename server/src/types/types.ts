export type User = {
  id: string;
  name: string;
  email: string;
};
export type CreateUser = {
  name: string;
  email: string;
};
export type updateUser = {
  name?: string;
  email?: string;
};
export type ParamsUser = {
  id: string;
};
