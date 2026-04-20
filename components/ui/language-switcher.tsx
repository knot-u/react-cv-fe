"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { useLanguage } from "@/hooks/use-language";
import type { LanguageId } from "@/lib/types";

type LanguageSwitcherProps = {
  orientation?: "horizontal" | "vertical";
};

export function LanguageSwitcher({ orientation = "horizontal" }: LanguageSwitcherProps) {
  const { language, setLanguage, languages } = useLanguage();
  const isVertical = orientation === "vertical";

  const handleChange = (_event: React.MouseEvent<HTMLElement>, value: LanguageId | null) => {
    if (value) setLanguage(value);
  };

  return (
    <ToggleButtonGroup
      exclusive
      orientation={orientation}
      size="small"
      value={language}
      onChange={handleChange}
      aria-label="Language selector"
      sx={{
        width: isVertical ? "100%" : "auto",
        height: isVertical ? "auto" : 32,
        minWidth: isVertical ? 0 : "auto",
        borderRadius: "12px",
        overflow: "hidden",
        border: isVertical ? 0 : "1px solid var(--color-border, rgba(255,255,255,0.12))",
        backgroundColor: isVertical ? "transparent" : "rgba(255,255,255,0.03)",
        backdropFilter: isVertical ? "none" : "blur(8px)",
        boxShadow: "none",
        "& .MuiToggleButton-root": {
          border: 0,
          color: "var(--color-muted-foreground, #94a3b8)",
          px: isVertical ? 0 : 1.1,
          py: isVertical ? 0.7 : 0,
          minWidth: isVertical ? "100%" : "auto",
          minHeight: isVertical ? 30 : 32,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: ".08em",
          textTransform: "uppercase",
        },
        "& .MuiToggleButton-root.Mui-selected": {
          color: "var(--color-foreground, #f8fafc)",
          backgroundColor: "rgba(255,255,255,0.08)",
        },
        "& .MuiToggleButton-root.Mui-selected:hover": {
          backgroundColor: "rgba(255,255,255,0.12)",
        },
      }}
    >
      {languages.map((item) => (
        <Tooltip key={item.id} title={item.description} arrow placement={isVertical ? "right" : "top"}>
          <ToggleButton value={item.id} aria-label={item.description}>
            {item.abbreviation}
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
