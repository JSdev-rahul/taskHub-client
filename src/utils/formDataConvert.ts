export function objectToFormData(
  obj: Record<string, any>,
  formData?: FormData,
  parentKey?: string
): FormData {
  formData = formData || new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const propName = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof Date) {
        formData.append(propName, value.toISOString());
      } else if (typeof value === "object" && !(value instanceof File)) {
        objectToFormData(value, formData, propName); // Recursive call for nested objects
      } else {
        formData.append(propName, value);
      }
    }
  }

  return formData;
}

//  funtion to check form data value , use this into on submit or anywhwre

// const entries = formData.entries();

//     // Iterate over the FormData entries using a traditional for loop
//     for (let entry = entries.next(); !entry.done; entry = entries.next()) {
//       const [key, value] = entry.value;
//       console.log(key, value);
//     }
