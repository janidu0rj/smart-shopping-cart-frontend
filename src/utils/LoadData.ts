import { layoutService } from "../hooks/services/layoutService";
import { Item } from "../types/Item";
import Fixture from "../types/Fixture";

/**
 * Loads the item mapping from layoutService
 */
export const loadItemMap = async (): Promise<Record<string, Item[][][]>> => {
  try {
    const layout = await layoutService.getLayout();
    return layout?.itemMap || {};
  } catch (error) {
    console.error("Error loading item map:", error);
    return {};
  }
};

/**
 * Loads the fixture layout from layoutService
 */
export const loadFixtureLayout = async (): Promise<Record<string, Fixture>> => {
  try {
    const layout = await layoutService.getLayout();
    return layout?.fixtureLayout || {};
  } catch (error) {
    console.error("Error loading store layout:", error);
    return {};
  }
};
