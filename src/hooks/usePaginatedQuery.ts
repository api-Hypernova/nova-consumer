import { useInfiniteQuery } from "@tanstack/react-query";
import { LIMIT } from "../api/config";


type QueryFnParams = {
  page: number;
};

type usePaginatedQueryParams<T, R = T> = {
  queryKey: string[];
  enabled?: boolean;
  queryFn: ({ page }: QueryFnParams) => Promise<{ data: T[]; count: number }>;
  limit?: number;
  // onSuccess?: (data: { pages: { data: T[] }[]; pageParams: number[] }) => void;
  // select?: (data: { pages: { data: T[] }[]; pageParams: number[] }) => any;
};

export const usePaginatedQuery = <T>({
  queryKey,
  queryFn,
  enabled = true,
  limit = LIMIT,
}: usePaginatedQueryParams<T>) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey,
    enabled: enabled,
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      const data = await queryFn({ page: pageParam });
      // console.log("page---<>in ", pageParam, Math.ceil(data?.count / limit));
      // console.log("data---<>in ", data);
      return {
        data: data.data,
        count: data?.count,
        nextPage: pageParam + 1,
        pagesCount: Math.ceil(data?.count / limit),
      };
    },
    getNextPageParam: ({
      data,
      pagesCount,
      nextPage,
      lastPageParam,
    }: {
      data: any;
      pagesCount: any;
      nextPage: any;
      lastPageParam: any;
    }) => {
      // console.log("Tstinnnn", {
      //   data: data?.length,
      //   pagesCount,
      //   nextPage,
      //   lastPageParam,
      // });
      // if (pagesCount < nextPage) return undefined;
      if (data?.length == 0) return undefined;
      return nextPage;
    },
  });

  return { ...rest, data: data?.pages?.map((page) => page?.data).flat() };
};
