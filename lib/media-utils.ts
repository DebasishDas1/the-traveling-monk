/**
 * Media URL Utilities
 * Helpers for converting and managing Google Drive and other media URLs
 */

/**
 * Extract file ID from Google Drive share link
 * @param link Google Drive share link (e.g., https://drive.google.com/file/d/1abc123/view?usp=drive_link)
 * @returns File ID (e.g., 1abc123)
 */
export function extractGoogleDriveFileId(link: string): string {
  const match = link.match(/\/file\/d\/([a-zA-Z0-9-_]+)\//)
  if (!match?.[1]) {
    console.warn('Could not extract Google Drive file ID from:', link)
    return ''
  }
  return match[1]
}

/**
 * Convert Google Drive file ID to direct download URL
 * @param fileId Google Drive file ID
 * @returns Direct download URL
 */
export function getGoogleDriveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

/**
 * Convert Google Drive file ID to preview/view URL
 * @param fileId Google Drive file ID
 * @returns Preview URL suitable for <img> tags
 */
export function getGoogleDrivePreviewUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w500`
}

/**
 * Convert Google Drive share link to preview URL
 * @param link Google Drive share link
 * @returns Preview URL
 */
export function convertGoogleDriveLink(link: string): string {
  const fileId = extractGoogleDriveFileId(link)
  if (!fileId) return link
  return getGoogleDrivePreviewUrl(fileId)
}

/**
 * Batch convert Google Drive links
 * @param links Array of Google Drive share links
 * @returns Array of preview URLs
 */
export function convertGoogleDriveLinks(links: string[]): string[] {
  return links.map(convertGoogleDriveLink)
}

/**
 * Validate if a URL is a Google Drive link
 * @param url URL to check
 * @returns Boolean
 */
export function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com')
}
