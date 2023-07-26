export function getProfile() {
  return new Promise((resolve, reject) => {
    fetch("/api/v1/profile/test")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
