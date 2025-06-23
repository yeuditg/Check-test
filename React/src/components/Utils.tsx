export const createPageUrl = (page: string, params: Record<string, string> = {}): string => {
    const baseUrl = `/path/to/your/base/${page}`;
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };