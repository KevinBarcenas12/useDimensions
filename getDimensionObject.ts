import type { DimensionObject } from "./types";

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
