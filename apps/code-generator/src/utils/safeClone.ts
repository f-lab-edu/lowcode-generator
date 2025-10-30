export function safeClone<T>(obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (_, value) => {
      if (typeof value === "function") return undefined;
      // React element도 제거
      if (value && value.$$typeof) return undefined;
      return value;
    })
  );
}
