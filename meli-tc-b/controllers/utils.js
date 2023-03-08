exports.fetchWrapper = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Request error");
  }
  return await response.json();
};
