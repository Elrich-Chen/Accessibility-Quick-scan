import { check_image } from "./checks";
import { check_headings } from "./checks";
import { check_links } from "./checks";
import type { Issue, Report } from './types';

export function runScan(doc: Document): Report {
    const issues:Issue[] = [];
    const passes: string[] = [];
    const stats = {
        total: 0,
        issues: 0
    }

    const Img_Report = check_image(doc);
    const Headings_Report = check_headings(doc);
    const Links_Report = check_links(doc);

    issues.push(...Img_Report.issues, ...Headings_Report.issues, ...Links_Report.issues);
    passes.push(...Img_Report.passes, ...Headings_Report.passes, ...Links_Report.passes);

    return { issues, passes, stats };
}