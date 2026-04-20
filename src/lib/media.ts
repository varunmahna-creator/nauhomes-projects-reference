import type { MediaItem } from "@/types";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "media.json");

export function getMedia(): MediaItem[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as MediaItem[];
  } catch {
    return [];
  }
}

export function saveMedia(items: MediaItem[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export function getMediaById(id: string): MediaItem | undefined {
  return getMedia().find((m) => m.id === id);
}
