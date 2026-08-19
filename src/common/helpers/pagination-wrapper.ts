export function paginateWrapper<T>(
  data: T[],
  page: number,
  limit: number,
  totalData: number,
) {
  const totalPage = Math.max(Math.ceil(totalData / limit), 1);
  return {
    data,
    pagination: {
      page,
      limit,
      totalPage,
      totalData,
    },
  };
}
