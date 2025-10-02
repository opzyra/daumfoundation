export class PaginateUtils {
  static buildQuery(page = 1, limit = 20) {
    if (limit > 100) {
      limit = 100;
    }

    const offset = (page - 1) * limit;

    return [limit, offset] as const;
  }

  static buildMetadata(
    page: number,
    limit: number,
    rowCount: number,
    totalCount: number,
  ) {
    if (!page) page = 1;
    if (!limit) limit = 20;
    let total = totalCount;

    if (Array.isArray(totalCount)) {
      total = totalCount.length;
    }

    const totalPages = Math.floor(total / limit);

    return {
      totalItems: total,
      itemCount: rowCount,
      itemsPerPage: limit,
      totalPages: total % limit > 0 ? totalPages + 1 : totalPages,
      currentPage: page,
    };
  }
}
