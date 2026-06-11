type ParamsType = Record<string, unknown>;

const validateParams = (params: ParamsType) =>
  Object.entries(params).reduce((acc: ParamsType, [key, value]) => {
    if (!value) return acc;

    acc[key] = value;
    return acc;
  }, {});

export const paramsSerializer = (params: ParamsType) => {
  const validatedParams = validateParams(params);
  const searchParams = new URLSearchParams();
  const searchParamsArray = Object.entries(validatedParams);

  for (const [key, value] of searchParamsArray) {
    if (!value || (Array.isArray(value) && !value.length)) continue;

    if (Array.isArray(value) && !!value.length) {
      value.forEach((item) => searchParams.append(key, String(item)));
      continue;
    }

    if (value instanceof Date) {
      searchParams.append(key, value.toISOString());
      continue;
    }

    searchParams.append(key, String(value));
  }

  return searchParams.toString();
};
