export function parseHTML(html: string): Document | null {
    if (html === null || html.trim().length === 0) {
        return null;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc;
}