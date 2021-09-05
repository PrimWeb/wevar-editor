const fetcher = (url) =>
  fetch(url, {
    headers: new Headers({
      "Content-Type": "application/json",
      "X-Restu-Api-Key": process.env.API_KEY,
    }),
  }).then((res) => res.json());

export default fetcher;
