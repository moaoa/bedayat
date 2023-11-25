export const removeEmptyStringValues = <TObject>(
  obj: TObject
): Partial<TObject> => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === "") {
      delete newObj[key];
    }
  });
  return newObj;
};
