import config from "@/config/config.json";
import { defaultSort, sorting } from "@/lib/constants";
import type { PageInfo, Product } from '@/lib/shopify/types';
import React, { useEffect, useRef, useState } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { AddToCart } from './cart/AddToCart';

const ProductList = ({
  initialProducts,
  initialPageInfo,
  sortKey,
  reverse,
  searchValue
}: {
  initialProducts: Product[];
  initialPageInfo: PageInfo;
  sortKey: string;
  reverse: boolean;
  searchValue: string | null;
}) => {
  const { currencySymbol } = config.shopify;
  const [products, setProducts] = useState(initialProducts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [loading, setLoading] = useState(false);
  const [currentSortKey, setCurrentSortKey] = useState(sortKey);
  const [currentReverse, setCurrentReverse] = useState(reverse);
  const [sortChanged, setSortChanged] = useState(false);
  const loaderRef = useRef(null);

  const getSortParams = (sortKey: string) => {
    const sortOption = sorting.find((item) => item.slug === sortKey) || defaultSort;
    return { sortKey: sortOption.sortKey, reverse: sortOption.reverse };
  };

  const loadMoreProducts = async () => {
    if (loading || !pageInfo.hasNextPage) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/products.json?cursor=${pageInfo.endCursor || ''}&sortKey=${currentSortKey}&reverse=${currentReverse}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const { products: newProducts, pageInfo: newPageInfo } = await response.json();

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPageInfo(newPageInfo);
      setSortChanged(false);
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStateFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const newSortKey = params.get("sortKey") || sortKey;

    const { sortKey: mappedSortKey, reverse: mappedReverse } = getSortParams(newSortKey);

    // Update only if URL params differ from current state
    if (mappedSortKey !== currentSortKey || mappedReverse !== currentReverse) {
      setCurrentSortKey(mappedSortKey);
      setCurrentReverse(mappedReverse);
      setProducts([]); // Clear products to load new set based on params
      setPageInfo(initialPageInfo); // Reset page info
      setSortChanged(true); // Set the flag to load products based on new sortKey and reverse
    }
  };

  useEffect(() => {
    // Listen for URL changes and handle state updates
    window.addEventListener("popstate", updateStateFromURL);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("popstate", updateStateFromURL);
    };
  }, [initialPageInfo]);

  // Intersection observer to trigger loading more products
  useEffect(() => {
    if (sortChanged) {
      // Load products if sorting has changed
      loadMoreProducts();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreProducts();
          }
        },
        { threshold: 1.0 }
      );

      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }

      return () => {
        if (loaderRef.current) {
          observer.unobserve(loaderRef.current);
        }
      };
    }
  }, [pageInfo?.endCursor, currentSortKey, currentReverse, sortChanged]);

  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <div className="row mx-auto px-4">
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "There are no products that match "
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold text-dark dark:text-darkmode-text-dark">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      {products?.length === 0 && (
        <div className="mx-auto pt-5 text-center">
          <img
            className="mx-auto mb-6"
            src="/images/no-search-found.png"
            alt="no-search-found"
            width={211}
            height={184}
          />
          <h1 className="h2 mb-4">No Product Found!</h1>
          <p>
            We couldn&apos;t find what you filtered for. Try filtering again.
          </p>
        </div>
      )}

      <div className="space-y-10">
        {products?.map((product: Product) => {
          const {
            id,
            title,
            variants,
            handle,
            featuredImage,
            priceRange,
            description,
            compareAtPriceRange,
          } = product;

          const defaultVariantId =
            variants.length > 0 ? variants[0].id : undefined;

          return (
            <div className="col-12" key={id}>
              <div className="row">
                <div className="col-4">
                  <img
                    src={featuredImage?.url || "/images/product-placeholder.jpg"}
                    // fallback={'/images/category-1.png'}
                    width={312}
                    height={269}
                    alt={featuredImage?.altText || "fallback image"}
                    className="w-[312px] h-[150px] md:h-[269px] object-cover border border-border dark:border-darkmode-border rounded-md"
                  />
                </div>

                <div className="col-8 py-3 max-md:pt-4">
                  <h2 className="font-bold md:font-normal h4">
                    <a href={`/products/${handle}`}>{title}</a>
                  </h2>

                  <div className="flex items-center gap-x-2 mt-2">
                    <span className="text-text-light dark:text-darkmode-text-light text-xs md:text-lg font-bold">
                      ৳ {priceRange?.minVariantPrice?.amount}{" "}
                      {priceRange?.minVariantPrice?.currencyCode}
                    </span>
                    {parseFloat(
                      compareAtPriceRange?.maxVariantPrice?.amount,
                    ) > 0 ? (
                      <s className="text-text-light dark:text-darkmode-text-light text-xs md:text-base font-medium">
                        {currencySymbol}{" "}
                        {compareAtPriceRange?.maxVariantPrice?.amount}{" "}
                        {compareAtPriceRange?.maxVariantPrice?.currencyCode}
                      </s>
                    ) : (
                      ""
                    )}
                  </div>

                  <p className="max-md:text-xs text-text-light dark:text-darkmode-text-light my-4 md:mb-8 line-clamp-1 md:line-clamp-3">
                    {description}
                  </p>
                  <AddToCart
                    variants={product?.variants}
                    availableForSale={product?.availableForSale}
                    handle={product?.handle}
                    defaultVariantId={defaultVariantId}
                    stylesClass={
                      "btn btn-outline-primary max-md:btn-sm drop-shadow-md"
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pageInfo?.hasNextPage && (
        <div ref={loaderRef} className="text-center pt-10 pb-4 w-full">
          {loading ? <BiLoaderAlt className={`animate-spin mx-auto`} size={30} /> : 'Scroll for more'}
        </div>
      )}
    </div>
  );
};

export default ProductList;
