import type { editor } from "monaco-editor";
import Editor, { type OnMount } from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@packages/ui";
import { type TreeNode } from "../../types";
import { useCodeGeneration } from "../../hooks/useCodeGeneration";

interface CodeViewerProps {
  nodes: TreeNode[];
  height?: string;
  theme?: "vs-dark" | "light";
  readOnly?: boolean;
  showMinimap?: boolean;
}

type EditorTheme = "vs-dark" | "light";

export function CodeViewer({
  nodes,
  height = "600px",
  readOnly = true,
  showMinimap = false,
}: CodeViewerProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [theme, setTheme] = useState<EditorTheme>("vs-dark");
  const [fileName, setFileName] = useState<string>("GeneratedComponent");

  const { generatedCode, generateCode } = useCodeGeneration({
    indent: 2,
    includeImports: true,
    generateComponentName: fileName,
  });

  // nodes 변경 시 코드 재생성
  useEffect(() => {
    if (nodes && nodes.length > 0) {
      generateCode(nodes);
    }
  }, [nodes, generateCode]);

  // Editor 마운트 시
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // TypeScript 설정
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
    });

    // 포맷팅 단축키 설정
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  // 테마 변경
  const handleThemeChange = () =>
    setTheme(theme === "vs-dark" ? "light" : "vs-dark");

  // 코드 복사
  const handleCopy = () => navigator.clipboard.writeText(generatedCode);

  // 코드 다운로드
  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="code-editor-wrapper">
      {/* 툴바 */}
      <div
        className={cn(
          "code-editor-toolbar",
          theme === "vs-dark" ? "theme-dark" : "theme-light"
        )}
      >
        <button onClick={handleThemeChange}>Theme Change</button>
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleDownload}>Download</button>
      </div>

      {/* Monaco Editor */}
      <div className="code-editor">
        <Editor
          width={"100%"}
          height={height}
          defaultLanguage="typescript"
          value={generatedCode}
          theme={theme}
          onMount={handleEditorDidMount}
          options={{
            readOnly: readOnly,
            minimap: { enabled: showMinimap },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "off",
            formatOnPaste: true,
            formatOnType: true,
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
        />
      </div>
    </div>
  );
}
