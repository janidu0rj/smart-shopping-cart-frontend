export interface ItemMap {
  id: string;           // Unique identifier (e.g., barcode)
  name: string;         // Display name
  row: number;          // Row position in grid
  col: number;          // Column position in grid
  index: number;        // Index for stacking or ordering
}