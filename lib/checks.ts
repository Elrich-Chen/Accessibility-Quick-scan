import type { Issue, Report } from './types';

// checks images for missing alt text for accessibility purposes
export function check_image(doc: Document): Report {
    const issues: Issue[] = [];
    const passes: string[] = [];

    const images = doc.querySelectorAll('img');
    for (const image of images) {
        const alt = image.getAttribute("alt");
        // checks if missing or if the alt text = "  " is meaningful
        if (alt === null || alt.trim().length === 0) {
            const src = image.getAttribute("src");
            const temp:Issue =  {
                message: `Missing alt text. \n src: ${src ?? "no src found"} \n ${image.outerHTML}`,
                why: "Screen readers can't describe images without alt text.",
                suggestion: "Add alt='...' describing the image's purpose.",
                type: "image"
            }
            issues.push(temp);
        }
    }

    if (issues.length === 0) {
        passes.push("All images have meaningful alt text!");
    }

    return { passes, issues };
}

// checks for headings for accessiblity readers for how content in a website is organised
export function check_headings(doc: Document): Report {
    const issues: Issue[] = [];
    const passes: string[] = [];

    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let prevLevel: number | null = null;
    for (const heading of headings) {
        const tag = heading.tagName;   // eg. "H2"
        const level = Number(tag[1]);  // eg. 2

        if (prevLevel !== null && level - prevLevel > 1) {
            issues.push({
                message: `Heading level jumps from H${prevLevel} to H${level}. \nat ${heading.outerHTML}`,
                why: "Skipping heading levels breaks structure for screen readers.",
                suggestion: `Use the next logical heading level (e.g., change this to H${prevLevel + 1} / H${prevLevel + 2}) so the hierarchy is consistent. \n
                If this text is only for styling and not a real section title, replace it with a non-heading element (p/span/div) and style it instead.`,
                type: "heading"
            });
        }

        prevLevel = level;
    }

    if (issues.length === 0) {
        passes.push("No heading level jumps detected.");
    }

    return { issues, passes };
}

// check links for accessibility whether they have supporting text
export function check_links(doc: Document) : Report {
    const issues: Issue[] = [];
    const passes: string[] = [];

    const links = doc.querySelectorAll("a");
    const vague = ["click here", "read more", "learn more", "more", "here"];

    for (const link of links) {
        const text = link.textContent?? "";
        const normalizedText = text.trim();
        if (normalizedText.length === 0) {
            let hasName = false;
            const aria = link.getAttribute("aria-label");
            if (aria && aria.trim().length > 0) {
                hasName = true;
            } else {
                const images = link.querySelector("img");
                const alt = images?.getAttribute("alt") ?? "";
                if (images && alt.trim().length > 0) {
                    hasName = true;
                }
            }
            if (!hasName) {
                issues.push({
                    message: `Link has no accessible name (no text, aria-label, or image alt).\n${link.outerHTML}`,
                    why: "Screen readers list links without surrounding context. If a link has no accessible name, users can't tell what it does.",
                    suggestion: "Give the link a clear label: add visible text, or an aria-label, or ensure any icon image inside it has meaningful alt text.",
                    type: "link"
                });
            }
        } else if (vague.includes(normalizedText.toLowerCase())) {
            issues.push({
                message: `Link has a very vague description text.\n${link.outerHTML}`,
                why: "Screen readers list links without surrounding context. If a link has a vague name, users can't tell what it does.",
                suggestion: "Give the link a clear label and have meaningful text.",
                type: "link"
            });
        }
    }

    if (issues.length === 0) {
        passes.push("Links are apporpirate and have descriptive supporting text!")
    }
    return { issues, passes };
}