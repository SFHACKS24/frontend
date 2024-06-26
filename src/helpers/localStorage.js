import { v4 as uuidv4 } from "uuid";

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function uploadDataToBackend(url) {
  const data = getAllData();
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Data uploaded successfully");
      } else {
        console.error("Failed to upload data");
      }
    })
    .catch((error) => {
      console.error("Error uploading data:", error);
    });
}

export function getAllData() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = getItem(key);
    data[key] = value;
  }
  return data;
}

// Function to generate a cookie in localStorage that uses timestamp and a random UUID
export function startSession() {
  const timestamp = Date.now();
  const uuid = uuidv4();
  const cookie = `${timestamp}-${uuid}`;
  setItem("userId", cookie);
}

export function clearSession() {
  removeItem("userId");
}
