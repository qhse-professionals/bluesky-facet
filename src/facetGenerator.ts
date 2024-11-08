import { BlueskyFacet, LinkFeature, MentionFeature } from './types';

export function detectFacets(text: string): BlueskyFacet[] {
  const facets: BlueskyFacet[] = [];
  
  // URL detection regex
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let match: RegExpExecArray | null;
  
  // Detect URLs
  while ((match = urlRegex.exec(text)) !== null) {
    facets.push({
      index: {
        byteStart: match.index,
        byteEnd: match.index + match[0].length
      },
      features: [{
        $type: "app.bsky.richtext.facet#link",
        uri: match[0]
      }]
    });
  }
  
  // Mention detection regex (handles both @handle and @handle.bsky.social formats)
  const mentionRegex = /@([a-zA-Z0-9.-]+(?:\.[a-zA-Z0-9.-]+)*)/g;
  
  // Detect mentions
  while ((match = mentionRegex.exec(text)) !== null) {
    const handle = match[1];
    // In a real app, you'd want to validate/resolve the DID
    const temporaryDid = `did:plc:${Buffer.from(handle).toString('hex')}`;
    
    facets.push({
      index: {
        byteStart: match.index,
        byteEnd: match.index + match[0].length
      },
      features: [{
        $type: "app.bsky.richtext.facet#mention",
        did: temporaryDid
      }]
    });
  }
  
  // Sort facets by start index
  return facets.sort((a, b) => a.index.byteStart - b.index.byteStart);
}