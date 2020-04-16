export const isValueSafe = (aValue: any): any => {
  if ((typeof aValue === undefined) || (aValue === null)) {
    return false
  }
  else if (typeof aValue == "string") {
      return (aValue.trim.length > 4)
  }
  else {
    return false;
  }
};

export const toCleanString = (aValue: any): string => {
  if (isValueSafe(aValue) && (typeof aValue == "string")) {
    return aValue?.trim();
  } else {
    return "";
  }
};

export const isURLLike = (aValue: any): boolean => {
  let cleanString: string = toCleanString(aValue);
  return cleanString.startsWith("http");
};

export const isDescriptionLike = (aValue: any): boolean => {
  return ((isURLLike(aValue) == false) && (toCleanString(aValue).length > 10));
};
