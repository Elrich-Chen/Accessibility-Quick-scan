export type Issue = {
  message: string;
  why: string;
  suggestion: string;
  type: "image" | "heading" | "link" 
};

export type Stats = {
  total: number;
  issues: number;
};

export type Report = {
  passes: string[];
  issues: Issue[];
};

export type ScannerInputProps = {
  html: string;
  onHtmlChange: (newHtml: string) => void;
  onScan: () => void;
};

export type ResultsPanelProps = {
  report: Report | null;
};
