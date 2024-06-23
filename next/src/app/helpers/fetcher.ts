export const fetcher = async (url: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  const totalCount = response.headers.get("X-Total-Count");
  return { data, totalCount };
};
