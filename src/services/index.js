export const fetchUsers = (params) => {
  const buildParams = new URLSearchParams(params);
  return fetch(
    `https://626d17e250a310b8a34afd47.mockapi.io/users?${buildParams}`
  );
};
