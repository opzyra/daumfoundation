interface PaginateMetaProps {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export default class NumberUtils {
  static percent = (denominator?: number, molecule?: number) => {
    if (!denominator || !molecule) return 0;
    return Math.floor((denominator / molecule) * 100);
  };

  static pageNumbering = (
    index: number,
    metadata?: PaginateMetaProps,
    order: string = 'desc',
  ) => {
    if (!metadata) {
      return 0;
    }

    const { totalItems, itemsPerPage, itemCount, currentPage } = metadata;

    if (order === 'desc') {
      const fullPageTopNumber = itemCount * itemsPerPage;
      const diff = fullPageTopNumber - totalItems;
      let topNumber = (itemCount - currentPage + 1) * itemsPerPage - diff;
      return topNumber - index;
    }

    let topNumber = (currentPage - 1) * itemsPerPage + 1;
    return topNumber + index;
  };
}
