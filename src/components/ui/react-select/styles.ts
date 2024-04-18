/**
 * styles that aligns with shadcn/ui
 */
export const controlStyles = {
  base: "flex !min-h-9 w-full rounded-md border border-input bg-transparent pl-3 py-1 pr-1 gap-1 text-sm shadow-sm transition-colors hover:cursor-pointer",
  focus: "outline-none ring-1 ring-ring",
  disabled: "cursor-not-allowed opacity-50",
};
export const placeholderStyles = "text-sm text-muted-foreground";
export const valueContainerStyles = "gap-1";
export const multiValueStyles =
  "inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
export const indicatorsContainerStyles = "gap-1";
export const clearIndicatorStyles = "p-1 rounded-md";
export const indicatorSeparatorStyles = "bg-border";
export const dropdownIndicatorStyles = "p-1 rounded-md";
export const menuStyles =
  "p-1 mt-1 border bg-popover shadow-md rounded-md text-popover-foreground";
export const groupHeadingStyles =
  "py-2 px-1 text-secondary-foreground text-sm font-semibold";
export const optionStyles = {
  base: "hover:cursor-pointer hover:bg-accent hover:text-accent-foreground px-2 py-1.5 rounded-sm !text-sm !cursor-default !select-none !outline-none font-sans",
  focus: "active:bg-accent/90 bg-accent text-accent-foreground",
  disabled: "pointer-events-none opacity-50",
  selected: "",
};
export const noOptionsMessageStyles =
  "text-accent-foreground p-2 bg-accent border border-dashed border-border rounded-sm";
export const loadingIndicatorStyles =
  "flex items-center justify-center h-4 w-4 opacity-50";
export const loadingMessageStyles = "text-accent-foreground p-2 bg-accent";

export const defaultStyles = {
  input: {
    "input:focus": {
      boxShadow: "none",
    },
  },
  multiValueLabel: {
    whiteSpace: "normal",
    overflow: "visible",
  },
  control: {
    transition: "none",
    // minHeight: '2.25rem', // we used !min-h-9 instead
  },
  menuList: {
    "::-webkit-scrollbar": {
      background: "transparent",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "hsl(var(--border))",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "transparent",
    },
  },
};
