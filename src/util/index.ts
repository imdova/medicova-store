export const isCurrentPage = (pathname?: string, pattern?: string): boolean => {
  if (!pathname || !pattern) return false;

  const regexPattern = pattern
    .replace(/\[.*?\]/g, "[^/]+")
    .replace(/\//g, "\\/");

  const exactRegex = new RegExp(`^${regexPattern}$`);
  if (exactRegex.test(pathname)) return true;

  if (pattern.includes("*")) {
    const wildcardPattern = pattern.replace(/\*/g, ".*");
    const wildcardRegex = new RegExp(`^${wildcardPattern}`);
    return wildcardRegex.test(pathname);
  }

  return false;
};
