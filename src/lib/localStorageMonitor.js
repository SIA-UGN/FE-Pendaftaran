if (typeof window !== "undefined") {
  const originalSetItem = localStorage.setItem.bind(localStorage);
  const originalRemoveItem = localStorage.removeItem.bind(localStorage);
  const originalClear = localStorage.clear.bind(localStorage);

  localStorage.setItem = function (key, value) {
    console.log(`📦 localStorage.setItem called:`, {
      key,
      value: key === "access_token" ? value.substring(0, 20) + "..." : value,
      timestamp: new Date().toISOString(),
      stack: new Error().stack,
    });
    originalSetItem(key, value);
  };

  localStorage.removeItem = function (key) {
    console.log(`🗑️ localStorage.removeItem called:`, {
      key,
      timestamp: new Date().toISOString(),
      stack: new Error().stack,
    });
    originalRemoveItem(key);
  };

  localStorage.clear = function () {
    console.log(`🧹 localStorage.clear called:`, {
      timestamp: new Date().toISOString(),
      stack: new Error().stack,
    });
    originalClear();
  };

  console.log("🔍 localStorage monitor activated");
}
