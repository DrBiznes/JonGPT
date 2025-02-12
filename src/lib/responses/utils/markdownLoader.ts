export async function loadMarkdownFile(path: string): Promise<string> {
  try {
    const response = await fetch(`/src/lib/responses/markdown/${path}.md`);
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${path}`);
    }
    return response.text();
  } catch (error) {
    console.error('Error loading markdown:', error);
    return `# Error Loading Content\nSorry, I couldn't load the content for ${path}. Please try again later.`;
  }
} 