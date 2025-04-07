
export interface StorageItem {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'document' | 'data';
  size: number;
  lastModified: string;
  path: string;
}
