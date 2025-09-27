/**
 * Do not edit directly
 * Generated on Thu, 25 Sep 2025 16:44:08 GMT
 */

export default tokens;

declare interface DesignToken {
  value: any;
  name?: string;
  comment?: string;
  themeable?: boolean;
  attributes?: {
    category?: string;
    type?: string;
    item?: string;
    subitem?: string;
    state?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

declare const tokens: {
  "color": {
    "primary": DesignToken,
    "secondary": DesignToken
  }
}
