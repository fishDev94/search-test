/**
 * Paginates an array by returning a subset of items for a specific page.
 *
 * @template T - The type of items in the array.
 * @param {T[]} array - The array to paginate.
 * @param {number} pageNumber - The page number to retrieve (1-based index).
 * @param {number} [itemsPerPage=20] - The number of items per page (default: 20).
 * @returns {T[]} - The paginated subset of the array.
 *
 * @example
 * const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const page1 = paginate(items, 1, 3); // Returns [1, 2, 3]
 * const page2 = paginate(items, 2, 3); // Returns [4, 5, 6]
 */
export function paginate<T>(array: T[], pageNumber: number, itemsPerPage: number = 20): T[] {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return array.slice(startIndex, endIndex);
}

/**
 * Calculates the total number of pages needed to paginate an array.
 *
 * @template T - The type of items in the array.
 * @param {T[]} array - The array to paginate.
 * @param {number} [itemsPerPage=20] - The number of items per page (default: 20).
 * @returns {number} - The total number of pages.
 *
 * @example
 * const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const totalPages = getTotalPages(items, 3); // Returns 4
 */
export function getTotalPages<T>(array: T[], itemsPerPage: number = 20) {
    return Math.ceil(array.length / itemsPerPage);
}
