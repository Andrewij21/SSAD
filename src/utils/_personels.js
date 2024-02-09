export const tHead = [
  { head: "username", prop: "username" },
  { head: "user id", prop: "_id" },
  { head: "devices", prop: "devices", value: "name" },
  { head: "role", prop: "roles" },
];

export const fields = [
  {
    type: "text",
    name: "password",
    label: "Reset password",
    required: false,
    focus: true,
    placeholder: "insert new password",
  },
  {
    type: "text",
    name: "username",
    label: "username",
    required: true,
    placeholder: "insert username",
  },
  {
    type: "select",
    name: "roles",
    label: "user role",
    required: true,
    placeholder: "insert user role",
    default: { value: "user" },
  },
];

export const actions = {
  delete: true,
  edit: { value: true, props: fields },
  verified: false,
};
