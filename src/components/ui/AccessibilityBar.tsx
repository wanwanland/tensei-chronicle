"use client";

import { useState, useEffect } from "react";
import { Settings, Type, Sun, Eye } from "lucide-react";

type FontSize = "small" | "medium" | "large";
type ColorMode = "cyber" | "highcontrast" | "light";

const FONT_SIZES: Record<FontSize, string> = {
  small: "90%",
  medium: "100%",
  large: "120%",
};

const FONT_LABELS: Record<FontSize, string> = {
  small: "小",
  medium: "中",
  large: "大",
};

const COLOR_LABELS: Record<ColorMode, string> = {
  cyber: "サイバー",
  highcontrast: "高コントラスト",
  light: "ライト",
};

export function AccessibilityBar() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [colorMode, setColorMode] = useState<ColorMode>("cyber");

  // Load saved preferences
  useEffect(() => {
    const savedFont = localStorage.getItem("a11y-font") as FontSize | null;
    const savedColor = localStorage.getItem("a11y-color") as ColorMode | null;
    if (savedFont) setFontSize(savedFont);
    if (savedColor) setColorMode(savedColor);
  }, []);

  // Apply font size
  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZES[fontSize];
    localStorage.setItem("a11y-font", fontSize);
  }, [fontSize]);

  // Apply color mode
  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", colorMode);
    localStorage.setItem("a11y-color", colorMode);
  }, [colorMode]);

  return (
    <div className="fixed right-3 bottom-3 z-50" role="region" aria-label="アクセシビリティ設定">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 backdrop-blur-md transition-colors hover:border-neon-cyan/50"
        aria-label="アクセシビリティ設定を開く"
        aria-expanded={open}
      >
        <Settings className="h-4 w-4 text-white/60" />
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute right-0 bottom-14 w-64 rounded-lg border border-white/15 bg-black/95 p-4 backdrop-blur-md">
          <p className="mb-3 flex items-center gap-2 font-mono text-xs text-white/60">
            <Eye className="h-3.5 w-3.5" />
            表示設定
          </p>

          {/* Font size */}
          <div className="mb-4">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] text-white/40">
              <Type className="h-3 w-3" />
              文字サイズ
            </p>
            <div className="flex gap-1.5">
              {(["small", "medium", "large"] as FontSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`flex-1 rounded border px-2 py-1.5 font-mono text-xs transition-colors ${
                    fontSize === size
                      ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan"
                      : "border-white/10 text-white/50 hover:border-white/30"
                  }`}
                  aria-pressed={fontSize === size}
                >
                  {FONT_LABELS[size]}
                </button>
              ))}
            </div>
          </div>

          {/* Color mode */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] text-white/40">
              <Sun className="h-3 w-3" />
              配色
            </p>
            <div className="flex flex-col gap-1.5">
              {(["cyber", "highcontrast", "light"] as ColorMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setColorMode(mode)}
                  className={`rounded border px-3 py-1.5 text-left font-mono text-xs transition-colors ${
                    colorMode === mode
                      ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan"
                      : "border-white/10 text-white/50 hover:border-white/30"
                  }`}
                  aria-pressed={colorMode === mode}
                >
                  {COLOR_LABELS[mode]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
