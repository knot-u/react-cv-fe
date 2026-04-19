"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { useLanguage } from "@/hooks/use-language";
import type { LanguageId } from "@/lib/types";

export function LanguageSwitcher() {
  const { language, setLanguage, languages } = useLanguage();

  const handleChange = (_event: React.MouseEvent<HTMLElement>, value: LanguageId | null) => {
    if (value) setLanguage(value);
  };

  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={language}
      onChange={handleChange}
      aria-label="Language selector"
      sx={{
        height: 32,
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid var(--color-border, rgba(255,255,255,0.12))",
        backgroundColor: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(8px)",
        "& .MuiToggleButton-root": {
          border: 0,
          color: "var(--color-muted-foreground, #94a3b8)",
          px: 1.1,
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
        <Tooltip key={item.id} title={item.description} arrow>
          <ToggleButton value={item.id} aria-label={item.description}>
            {item.abbreviation}
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
