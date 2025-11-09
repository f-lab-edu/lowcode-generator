import type { editor } from "monaco-editor";
import Editor, { type OnMount } from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@packages/ui";
import { Download, Clipboard, Palette, PencilLine, Check } from "lucide-react";
import { type TreeNode } from "../../types";
import { useToggle } from "../../hooks/useToggle";
import { useTooltip } from "../../hooks/useTooltip";
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
  const { on, toggle } = useToggle(false);
  const copyTooltip = useTooltip(1000);
  const downloadTooltip = useTooltip(1000);

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
  const handleCopy = () =>
    copyTooltip.trigger(() => navigator.clipboard.writeText(generatedCode));

  // 코드 다운로드
  const handleDownload = () => {
    downloadTooltip.trigger(async () => {
      const blob = new Blob([generatedCode], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.tsx`;
      a.click();
      URL.revokeObjectURL(url);
    });
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
        <div className="code-editor-filename-wrapper">
          <button onClick={toggle}>
            <PencilLine />
            파일명 변경
          </button>
          {on && (
            <div
              className={cn(
                "code-editor-filename-popup",
                theme === "vs-dark" ? "theme-dark" : "theme-light"
              )}
            >
              <div className="filename-popup-header">
                <span>파일명 변경</span>
              </div>
              <input
                id="fileName"
                name="fileName"
                placeholder="파일명을 변경해주세요."
                className="code-editor-input"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") toggle();
                  if (e.key === "Escape") toggle();
                }}
              />
              <button onClick={toggle} className="filename-confirm-btn">
                확인
              </button>
            </div>
          )}
        </div>
        <button onClick={handleThemeChange}>
          <Palette />
          테마 변경
        </button>
        <div className="toolbar-button-wrapper">
          <button onClick={handleCopy}>
            <Clipboard />
            복사
          </button>
          {copyTooltip.show && (
            <div className="toolbar-tooltip success">
              <Check className="tooltip-icon" />
              복사 완료!
            </div>
          )}
        </div>
        <div className="toolbar-button-wrapper">
          <button onClick={handleDownload}>
            <Download />
            다운로드
          </button>
          {downloadTooltip.show && (
            <div className="toolbar-tooltip success">
              <Check className="tooltip-icon" />
              다운로드 완료!
            </div>
          )}
        </div>
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
