export type Issue = {
  message: string;
  why: string;
  suggestion: string;
};

export type Report = {
  passes: string[];
  issues: Issue[];
  stats: {
    total: number,
    issues: number
  }
};

export type ScannerInputProps = {
  html: string;
  onHtmlChange: (newHtml: string) => void;
  onScan: () => void;
};

export type ResultsPanelProps = {
  report: Report | null;
};
