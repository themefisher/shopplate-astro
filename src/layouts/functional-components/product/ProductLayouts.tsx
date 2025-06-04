import { setLayoutView } from "@/cartStore";
import { type SortFilterItem, sorting } from "@/lib/constants";
import { createUrl } from "@/lib/utils";
import React, { Suspense, useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { TbFilter, TbFilterX } from "react-icons/tb";
import DropdownMenu from "../filter/DropdownMenu";
import ProductFilters from "../ProductFilters";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

const ProductLayouts = ({
  categories,
  vendors,
  tags,
  maxPriceData,
  vendorsWithCounts,
  categoriesWithCounts,
}: any) => {
  const [isInputEditing, setInputEditing] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [isListView, setIsListView] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isListLayout = params.get("layout") === "list";
    setIsListView(isListLayout);
    setLayoutView(isListLayout ? "list" : "card");
  }, []);

  useEffect(() => {
    const inputField = document.getElementById("searchInput") as HTMLInputElement;
    const params = new URLSearchParams(window.location.search);
    if (isInputEditing || params.get("q")) {
      inputField?.focus();
    }
  }, [isInputEditing]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".collapse-container-class") &&
        !target.closest(".filter-button-container") &&
        isExpanded
      ) {
        setExpanded(false);
      }

      if (!target.closest("#searchInput") && isInputEditing) {
        setInputEditing(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isExpanded, isInputEditing]);

  function layoutChange(layoutType: string) {
    const params = new URLSearchParams(window.location.search);
    if (layoutType === "list") {
      params.set("layout", "list");
      setLayoutView("list");
    } else {
      params.delete("layout");
      setLayoutView("card");
    }

    const newUrl = createUrl("/products", params);
    window.history.pushState({}, "", newUrl);
    setIsListView(layoutType === "list");
  }

  return (
    <section className="pt-4">
      <div className="container">
        <div className="row">
          <div className="col-3 max-lg:hidden" />

          <div className="col-12 lg:col-9">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-x-4 items-center font-medium text-xs md:text-base">
                <p className="max-md:hidden text-text-dark dark:text-darkmode-text-dark">
                  Views
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => layoutChange("card")}
                    className={`btn border dark:border-darkmode-border ${isListView ? "btn-outline-primary" : "btn-primary"
                      } p-2 hover:scale-105 duration-300`}
                  >
                    <BsGridFill />
                  </button>
                  <button
                    onClick={() => layoutChange("list")}
                    className={`btn border dark:border-darkmode-border ${isListView ? "btn-primary" : "btn-outline-primary"
                      } p-2 hover:scale-105 duration-300`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>

              <div className="flex gap-x-8">
                <div className="filter-button-container block lg:hidden mt-1">
                  <button onClick={() => setExpanded(!isExpanded)}>
                    {isExpanded ? (
                      <span className="font-medium text-base flex gap-x-1 items-center justify-center">
                        <TbFilterX /> Filter
                      </span>
                    ) : (
                      <span className="font-medium text-base flex gap-x-1 items-center justify-center">
                        <TbFilter /> Filter
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex gap-x-4 items-center font-medium text-sm md:text-base relative z-20">
                  <p className="max-md:hidden text-text-dark dark:text-darkmode-text-dark">
                    Sort By
                  </p>
                  <Suspense>
                    <DropdownMenu list={sorting} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 lg:col-3">
            <div className="lg:block relative">
              <div className="block lg:hidden w-full">
                <section
                  className="collapse-container-class z-20 bg-body dark:bg-darkmode-body w-full px-4 rounded-md"
                  style={{ display: isExpanded ? "block" : "none" }}
                >
                  <div className="pb-8">
                    <Suspense>
                      <ProductFilters
                        categories={categories}
                        vendors={vendors}
                        tags={tags}
                        maxPriceData={maxPriceData}
                        vendorsWithCounts={vendorsWithCounts}
                        categoriesWithCounts={categoriesWithCounts}
                      />
                    </Suspense>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLayouts;
