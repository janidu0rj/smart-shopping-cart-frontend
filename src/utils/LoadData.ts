// import { layoutService } from "../hooks/services/layoutService";

// interface ItemMap {
//   [barcode: string]: {
//     row: number;
//     col: number;
//     index: number;
//   };
// }

// interface FixtureLayout {
//   [fixtureId: string]: {
//     type: string;
//     position: { row: number; col: number };
//     size: { width: number; height: number };
//   };
// }

// /**
//  * Data loading utilities for retrieving persisted application state from database
//  * Handles API errors gracefully with fallback values
//  */

// /**
//  * Loads the item mapping from localStorage
//  * @returns Parsed item map or empty object if not found/corrupted
//  */
// export const loadItemMap = async (storeName: string): Promise<ItemMap> => {
//   try {
//     const layout = await layoutService.getLayout();
//     return layout?.itemMap || {};
//   } catch (error) {
//     console.error("Error loading item map:", error);
//     return {};
//   }
// };

// /**
//  * Loads the fixture layout from localStorage
//  * @returns Parsed fixture map or empty object if not found/corrupted
//  */
// export const loadFixtureLayout = async (storeName: string): Promise<FixtureLayout> => {
//   try {
//     const layout = await layoutService.getLayout();
//     return layout?.fixtureLayout || {};
//   } catch (error) {
//     console.error("Error loading store layout:", error);
//     return {};
//   }
// };