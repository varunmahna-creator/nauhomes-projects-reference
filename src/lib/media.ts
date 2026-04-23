import type { MediaItem } from "@/types";

// Default media coverage data
const defaultMedia: MediaItem[] = [
  {
    id: "1",
    name: "Economic Times",
    logoUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80",
    articleUrl: "#",
    date: "2024-12-01"
  },
  {
    id: "2",
    name: "Business Standard", 
    logoUrl: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=200&q=80",
    articleUrl: "#",
    date: "2024-11-15"
  }
];

// In-memory storage
let mediaStorage: MediaItem[] = [...defaultMedia];

export function getMedia(): MediaItem[] {
  return mediaStorage;
}

export function saveMedia(media: MediaItem[]): void {
  mediaStorage = [...media];
}

export function getMediaById(id: string): MediaItem | undefined {
  return mediaStorage.find((m) => m.id === id);
}