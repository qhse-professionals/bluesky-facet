export interface BlueskyFacet {
  index: {
    byteStart: number;
    byteEnd: number;
  };
  features: {
    $type: string;
    [key: string]: any;
  }[];
}

export interface LinkFeature {
  $type: "app.bsky.richtext.facet#link";
  uri: string;
}

export interface MentionFeature {
  $type: "app.bsky.richtext.facet#mention";
  did: string;
}