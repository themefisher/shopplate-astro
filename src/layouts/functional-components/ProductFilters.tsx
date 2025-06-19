import type { ShopifyCollection } from "@/lib/shopify/types";
import { slugify } from "@/lib/utils/textConverter";
import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import ShowTags from "./product/ShowTags";
import RangeSlider from "./rangeSlider/RangeSlider";

const ProductFilters = ({
  collections,
  vendors,
  tags,
  maxPriceData,
  vendorsWithCounts,
  categoriesWithCounts,
}: {
  collections: ShopifyCollection[];
  vendors: { vendor: string; productCount: number }[];
  tags: string[];
  maxPriceData: { amount: string; currencyCode: string };
  vendorsWithCounts: { vendor: string; productCount: number }[];
  categoriesWithCounts: { category: string; productCount: number }[];
}) => {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const selectedBrands = searchParams.getAll("b");
  const selectedCategory = searchParams.get("c");

  const updateSearchParams = (newParams: URLSearchParams) => {
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.location.href = newUrl.toString();
    setSearchParams(newParams);
  };

  const handleBrandClick = (name: string) => {
    const slugName = slugify(name.toLowerCase());
    const newParams = new URLSearchParams(searchParams.toString());

    const currentBrands = newParams.getAll("b");

    if (currentBrands.includes(slugName)) {
      newParams.delete("b", slugName);
    } else {
      newParams.append("b", slugName);
    }
    updateSearchParams(newParams);
  };

  const handleCollectionClick = (handle: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (handle === selectedCategory) {
      newParams.delete("c");
    } else {
      newParams.set("c", handle);
    }
    updateSearchParams(newParams);
  };

  return (
    <div>
      <div>
        {/* <h5 className="mb-2 lg:text-xl">Select Price Range</h5> */}
        <hr className="border-border dark:border-darkmode-border" />
        <div className="pt-4">
          <RangeSlider maxPriceData={maxPriceData} />
        </div>
      </div>

      <div>
        <h5 className="mb-2 mt-4 lg:mt-6 lg:text-xl">Product Collections</h5>
        <hr className="border-border dark:border-darkmode-border" />
        <ul className="mt-4 space-y-4">
          {collections.map((collection) => (
            <li
              key={collection.handle}
              className={`flex items-center justify-between cursor-pointer ${selectedCategory === collection.handle
                ? "text-text-dark dark:text-darkmode-text-dark font-semibold"
                : "text-text-light dark:text-darkmode-text-light"
                }`}
              onClick={() => handleCollectionClick(collection.handle)}
            >
              {collection.title}
              {searchParams.has("c") && !searchParams.has("b") ? (
                <span>({collection?.products?.edges.length || 0})</span>
              ) : (
                <span>
                  {categoriesWithCounts.length > 0
                    ? `(${categoriesWithCounts.find(
                      (c) => c.category === collection.title
                    )?.productCount || 0
                    })`
                    : `(${collection?.products?.edges.length || 0})`}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {vendors && (
        <div>
          <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Brands</h5>
          <hr className="border-border dark:border-darkmode-border" />
          <ul className="mt-4 space-y-4">
            {vendors.map((vendor) => (
              <li
                key={vendor.vendor}
                className={`flex items-center justify-between cursor-pointer text-text-light dark:text-darkmode-text-light`}
                onClick={() => handleBrandClick(vendor.vendor)}
              >
                {searchParams.has("b") &&
                  !searchParams.has("c") &&
                  !searchParams.has("minPrice") &&
                  !searchParams.has("maxPrice") &&
                  !searchParams.has("q") &&
                  !searchParams.has("t") ? (
                  <span>
                    {vendor.vendor} ({vendor.productCount})
                  </span>
                ) : (
                  <span>
                    {vendorsWithCounts.length > 0
                      ? `${vendor.vendor} (${vendorsWithCounts.find(
                        (v) => v.vendor === vendor.vendor
                      )?.productCount || 0
                      })`
                      : `${vendor.vendor} (${vendor.productCount})`}
                  </span>
                )}
                <div className="h-4 w-4 rounded-sm flex items-center justify-center border border-border dark:border-border/40">
                  {selectedBrands.includes(slugify(vendor.vendor.toLowerCase())) && (
                    <BsCheckLg size={16} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Tags</h5>
          <hr className="border-border dark:border-darkmode-border" />
          <div className="mt-4">
            <ShowTags tags={tags} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;