const StyleDictionary = require("style-dictionary");
const { fileHeader } = require("style-dictionary/lib/common/formatHelpers");
const fs = require("fs");
const path = require("path");

// ✅ 1. 기본 타입스크립트 포맷 (as const)
StyleDictionary.registerFormat({
  name: "typescript/as-const",
  formatter: function ({ dictionary }) {
    return (
      fileHeader(this) +
      `const tokens = ${JSON.stringify(
        dictionary.tokens,
        null,
        2
      )} as const;\n\n` +
      `export default tokens;\n`
    );
  },
});

// ✅ 2. Vanilla Extract용 JavaScript 포맷
StyleDictionary.registerFormat({
  name: "javascript/vanilla-extract",
  formatter: function ({ dictionary }) {
    function extractValues(obj) {
      const result = {};

      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === "object") {
          if ("value" in value) {
            const rawValue = value.value;
            const tokenType = value.type;
            // typograph 내부는 object로 이미 value가 자체적으로 구성되어 있는 semantic 타입
            if (tokenType === "typography") {
              result[key] = rawValue;
            } else if (tokenType === "boxShadow") {
              // boxshadow는 일반 string이 아닌 object 타입이라서 css string으로 포맷팅 필요
              result[key] = rawValue
                .map(
                  (shadow) =>
                    `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
                )
                .join(", ");
            } else if (typeof rawValue === "object" && rawValue !== null) {
              // 다른 합성 타입일 경우 (별도 핸들링 필요)
              console.log(
                `Warning: Unhandled composite token type "${tokenType}" for token "${key}". Treating as object.`
              );
              result[key] = rawValue;
            } else {
              // 기본적인 값
              result[key] = String(rawValue);
            }
          } else {
            // nested 구조일 경우
            const nested = extractValues(value);
            if (Object.keys(nested).length > 0) {
              result[key] = nested;
            }
          }
        }
      }

      return result;
    }

    const cleanTokens = extractValues(dictionary.properties);

    return (
      fileHeader(this) +
      `/**\n` +
      ` * Vanilla Extract용 디자인 토큰\n` +
      ` * @generated - 자동 생성된 파일입니다. 직접 수정하지 마세요.\n` +
      ` */\n\n` +
      `export const themeTokens = ${JSON.stringify(cleanTokens, null, 2)};\n`
    );
  },
});

// ✅ 3. Vanilla Extract용 타입 정의 (숫자/특수문자 키 처리)
StyleDictionary.registerFormat({
  name: "typescript/vanilla-extract-types",
  formatter: function ({ dictionary }) {
    // 유효한 JavaScript 식별자인지 확인
    function isValidIdentifier(key) {
      return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
    }

    function generateType(obj, depth = 0) {
      const indent = "  ".repeat(depth);
      const entries = Object.entries(obj);

      if (entries.length === 0) return "Record<string, never>";

      let result = "{\n";

      for (const [key, value] of entries) {
        // 유효한 식별자가 아니면 따옴표로 감싸기 (e.g. 숫자값 100, 2xl)
        const formattedKey = isValidIdentifier(key) ? key : `"${key}"`;

        if (value && typeof value === "object") {
          if ("value" in value) {
            const rawValue = value.value;
            const tokenType = value.type;

            if (tokenType === "typography") {
              let compositeType = "{\n";
              for (const propKey of Object.keys(rawValue)) {
                const formattedPropKey = isValidIdentifier(propKey)
                  ? propKey
                  : `"${propKey}"`;
                compositeType += `${"  ".repeat(
                  depth + 2
                )}${formattedPropKey}: string;\n`;
              }
              compositeType += `${"  ".repeat(depth + 1)}}`;
              result += `${indent}  ${formattedKey}: ${compositeType};\n`;
            } else {
              result += `${indent}  ${formattedKey}: string;\n`;
            }
          } else {
            result += `${indent}  ${formattedKey}: ${generateType(
              value,
              depth + 1
            )};\n`;
          }
        }
      }

      result += `${indent}}`;
      return result;
    }

    const typeDefinition = generateType(dictionary.properties);

    return (
      fileHeader(this) +
      `/**\n` +
      ` * Vanilla Extract용 디자인 토큰 타입\n` +
      ` * @generated\n` +
      ` */\n` +
      `export type ThemeTokens = ${typeDefinition};\n\n` +
      `export declare const themeTokens: ThemeTokens;\n`
    );
  },
});

// ✅ 4. 기본 tokens.d.ts 타입 정의
StyleDictionary.registerFormat({
  name: "typescript/type-definitions",
  formatter: function ({ dictionary }) {
    function isValidIdentifier(key) {
      return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
    }

    function generateType(obj, depth = 0) {
      const indent = "  ".repeat(depth);
      let result = "{\n";

      for (const [key, value] of Object.entries(obj)) {
        const formattedKey = isValidIdentifier(key) ? key : `"${key}"`;

        if (value && typeof value === "object") {
          if ("value" in value) {
            result += `${indent}  readonly ${formattedKey}: {\n`;
            result += `${indent}    readonly value: string;\n`;
            if (value.type) {
              result += `${indent}    readonly type: string;\n`;
            }
            result += `${indent}  };\n`;
          } else {
            result += `${indent}  readonly ${formattedKey}: ${generateType(
              value,
              depth + 1
            )};\n`;
          }
        }
      }

      result += `${indent}}`;
      return result;
    }

    const typeDefinition = generateType(dictionary.tokens);

    return (
      fileHeader(this) +
      `type TokenStructure = ${typeDefinition};\n\n` +
      `declare const tokens: TokenStructure;\n\n` +
      `export default tokens;\n` +
      `export type { TokenStructure };\n`
    );
  },
});

function getStyleDictionaryConfig() {
  return {
    source: ["src/**/*.json"],
    expand: true,
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "build/css/",
        files: [
          {
            destination: "variables.css",
            format: "css/variables",
            options: { outputReferences: true },
          },
        ],
      },
      json: {
        transformGroup: "js",
        buildPath: "build/json/",
        files: [
          {
            destination: "index.json",
            format: "json/nested",
            options: { outputReferences: true },
          },
        ],
      },
      // ✅ 기본 타입스크립트 (다른 곳에서 사용)
      ts: {
        transformGroup: "js",
        buildPath: "build/ts/",
        files: [
          {
            destination: "tokens.ts",
            format: "typescript/as-const",
          },
          {
            destination: "tokens.d.ts",
            format: "typescript/type-definitions",
          },
        ],
      },
      // ✅ Vanilla Extract 전용 빌드
      vanillaExtract: {
        transformGroup: "js",
        buildPath: "build/vanilla-extract/",
        files: [
          {
            destination: "theme-tokens.js",
            format: "javascript/vanilla-extract",
          },
          {
            destination: "theme-tokens.d.ts",
            format: "typescript/vanilla-extract-types",
          },
        ],
      },
      js: {
        transformGroup: "js",
        buildPath: "build/js/",
        files: [
          {
            destination: "index.js",
            format: "javascript/module",
            options: { outputReferences: true },
          },
        ],
      },
    },
  };
}

function buildTokens() {
  // 빌드 시작
  console.log("Building design tokens...");
  const config = getStyleDictionaryConfig();

  // 빌드 디렉터리 생성 (build 최초인 경우)
  fs.mkdirSync(path.join(__dirname, "..", "build"), { recursive: true });

  const sd = StyleDictionary.extend(config);
  sd.buildAllPlatforms();
  // 빌드 종료
  console.log("Design tokens built successfully!");
}

module.exports = { buildTokens };
