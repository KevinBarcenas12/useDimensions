import { useState, useLayoutEffect, useCallback } from "react";

interface DimensionObject {
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    x?: number;
    y?: number;
}

export function getDimensionObject(node: HTMLElement | null): DimensionObject {
    if (node == null) return {};
    let { width, height, top, left, right, bottom, ...rect } = node.getBoundingClientRect();

    return {
        x: 'x' in rect ? rect.x : left,
        y: 'y' in rect ? rect.y : top,
        top,
        left,
        right,
        bottom,
        width,
        height,
    };
}

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