export const tHead = [
  { head: "devices", prop: "name" },
  // { head: "macaddress", prop: "user", value: "macaddress" },
  { head: "macaddress", prop: "macaddress" },
  { head: "user", prop: "user", value: "username" },
  { head: "location", prop: "area", value: "location" },
  // { head: "status", prop: "status", value: "message" },
  { head: "verified", prop: "verified" },
];

export const actions = {
  delete: true,
  edit: { value: true },
  verified: true,
  detail: true,
};

export const fields = [
  {
    type: "text",
    name: "name",
    label: "device*",
    required: true,
    placeholder: "device name...",
  },
  {
    type: "text",
    name: "macaddress",
    label: "macaddress*",
    required: true,
    placeholder: "device macaddress...",
  },
  // {
  //   type: "text",
  //   name: "user",
  //   label: "user ID",
  //   required: false,
  //   placeholder: "input user id...",
  // },
  // {
  //   type: "select",
  //   name: "user",
  //   label: "user",
  //   required: false,
  //   placeholder: "select user",
  //   default: { value: "" },
  // },
  {
    type: "text",
    name: "location",
    label: "location",
    required: false,
    placeholder: "location...",
  },
  {
    type: "checkbox",
    name: "verified",
    label: "verified",
    required: false,
    placeholder: "validate...",
  },
];
