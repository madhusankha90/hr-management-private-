
export const getLocalStorageItem = (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(`Error accessing localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

