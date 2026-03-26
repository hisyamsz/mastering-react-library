import { useQuery } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

interface ProductProps {
  setSession: Dispatch<SetStateAction<string | null>>;
}

const getDataProduct = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products").then((res) =>
      res.json(),
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const Product = ({ setSession }: ProductProps) => {
  const {
    data: dataProduct,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getDataProduct(),
  });

  return (
    <div className="container mx-auto w-full space-y-4 px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <button
          onClick={() => setSession(null)}
          className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {isErrorProduct && (
        <div className="w-full rounded-lg bg-gray-50 p-8 text-center text-2xl font-bold text-gray-500">
          Product not found..
        </div>
      )}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-4">
        {isLoadingProduct ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-64 w-full animate-pulse rounded-lg bg-gray-300 p-4"
              />
            ))}
          </>
        ) : (
          <>
            {dataProduct?.map(
              (product: {
                id: number;
                title: string;
                image: string;
                price: number;
              }) => (
                <div
                  key={product.id}
                  className="flex w-full flex-col items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-6 pt-8 pb-4"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40"
                  />
                  <p
                    className="mt-4 line-clamp-1 text-center text-sm font-semibold text-gray-900"
                    title={product.title}
                  >
                    {product.title}
                  </p>
                  <hr className="my-4 w-full border-gray-200" />
                  <div className="flex w-full items-center justify-between">
                    <p className="text-xl font-semibold">${product.price}</p>
                    <button className="w-fit cursor-pointer rounded-md bg-indigo-600 px-4 py-1.5 text-center text-sm text-white hover:bg-indigo-700">
                      Buy
                    </button>
                  </div>
                </div>
              ),
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
