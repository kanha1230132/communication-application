/** save data in local storage  */
export const saveDataToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/** get data in local storage  */
export const getDataToLocalStorage = (key) => {
  let data = localStorage.getItem(key);
  if(data){
    return JSON.parse(data);
  }
  return [];
};


// Function to remove item from local storage
export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};