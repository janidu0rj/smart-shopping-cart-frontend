import React, { useEffect } from "react";
import ItemContainer from "./ItemContainer";
import { useEdgeContext } from "../../hooks/context/useEdgeContext";
import { useFixtureContext } from "../../hooks/context/useFixtureContext";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { useItemContext } from "../../hooks/context/useItemContext";
import { loadItemMap } from "../../utils/LoadData";
import styles from "./ItemMapEditorManager.module.css"; // Import the CSS Module

/**
 * ItemMapEditorManager - Grid-Based Item Organization Interface
 *
 * Full-screen overlay interface for organizing items within fixture edges.
 * Only renders when an edge is selected and item map editor is active.
 *
 * @component
 */

const ItemMapEditorManager: React.FC = () => {
    const { selectedEdge } = useEdgeContext();
    const { selectedFixtureId } = useFixtureContext();
    const { setItemMap } = useItemContext();

    const { profile, isAuthenticated } = useAuthContext();

    useEffect(() => {
        const loadItems = async () => {
            if (profile?.role === "MANAGER") {
            try {
                const savedMap = await loadItemMap(); // ✅ no argument
                setItemMap(savedMap); // ✅ matches expected type: Record<string, Item[][][]>
            } catch (error) {
                console.error("Error loading item map:", error);
            }
            }
        };
        if (isAuthenticated) {
            loadItems();
        }
        }, [isAuthenticated, profile?.role, setItemMap]);

    return (
        <div className={styles.itemMapEditorOverlay}>
            {/* Main content area with top margin and scroll capability */}
            <div className={`${styles.itemMapContent} scrollable-area`}> {/* Apply the global scrollable-area class */}
                {/* Conditional rendering - only show when edge is selected */}
                {selectedEdge !== null && (
                    <ItemContainer
                        edge={`${selectedFixtureId}-edge-${selectedEdge / 2}`}
                    />
                )}
            </div>
        </div>
    );
};

export default ItemMapEditorManager;