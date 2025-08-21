export type CategoryInfo = {
    id: number,
    name: string,
    parentId: number | null,
    children?: CategoryInfo[]
}

export type FlatCategoryInfo = Omit<CategoryInfo, "children">

export function flatCategories(categories: CategoryInfo[]): FlatCategoryInfo[] {
    const result: FlatCategoryInfo[] = [];

    for (const cat of categories) {
        const { children, ...rest } = cat;
        result.push(rest);

        if (children && children.length > 0) {
        result.push(...flatCategories(children));
        }
    }

    return result;
}