// Quick debug script - paste this in browser console after login
console.log("=== TOKEN DEBUG ===");
const token = localStorage.getItem("access_token");
const user = localStorage.getItem("user");

console.log("Token exists:", !!token);
console.log("Token length:", token?.length);
console.log("Token preview:", token?.substring(0, 30) + "...");
console.log("User:", user);

console.log("\n=== TESTING PROFILE ENDPOINT ===");
fetch("http://localhost:8000/api/profile", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + token,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    console.log("Status:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));
    return response.json();
  })
  .then((data) => {
    console.log("Response:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
