export function paginate<T>(array: T[], pageNumber: number, itemsPerPage: number = 20): T[] {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return array.slice(startIndex, endIndex);
}

export function getTotalPages<T>(array: T[], itemsPerPage: number = 20) {
    return Math.ceil(array.length / itemsPerPage);
}
