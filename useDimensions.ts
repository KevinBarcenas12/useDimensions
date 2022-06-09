import { useState, useLayoutEffect, useCallback } from "react";
import { getDimensionObject } from "./getDimensionObject";
import type { DimensionObject } from "./types";

export function useDimensions({ liveMeasure } = { liveMeasure: false }): [ (node: any) => void, DimensionObject ] {
    let [ dimensions, setDimensions ] = useState<DimensionObject>({});
    let [ node, setNode ] = useState(null);
    let ref = useCallback(node => setNode(node), []);

    useLayoutEffect(() => {
        if (!node) return;
        const measure = () => setDimensions(getDimensionObject(node));
        measure();

        if (!liveMeasure) return;
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);
        return () => {
            window.removeEventListener('resize', measure);
            window.removeEventListener('scroll', measure);
        };
    }, [node, liveMeasure]);

    return [ ref, dimensions ];
}
