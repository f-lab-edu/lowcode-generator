export function mapTokens(obj: any): any {
  if (obj == null) return obj;
  if (typeof obj === "object" && "value" in obj) return obj.value;

  if (typeof obj === "object") {
    const result: Record<string, any> = {};
    for (const key in obj) {
      result[key] = mapTokens(obj[key]);
    }
    return result;
  }
  return obj;
}
