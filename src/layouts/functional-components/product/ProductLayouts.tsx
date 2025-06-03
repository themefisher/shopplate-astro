import React, { useState, useEffect } from "react";
import { useCollapse } from "react-collapsed";
import { useStore } from "@nanostores/react";
import { layoutView, setLayoutView } from "@/cartStore";
import { BsGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { TbFilter, TbFilterX } from "react-icons/tb";
import DropdownMenu from "../filter/DropdownMenu";
import { type SortFilterItem, sorting } from "@/lib/constants";
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
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse();
  const [isInputEditing, setInputEditing] = useState(false);
  const layout = useStore(layoutView);

  const layoutChange = (isCard: string) => {
    setLayoutView(isCard === "list" ? "list" : "card");
  };

  useEffect(() => {
    const inputField = document.getElementById("searchInput") as HTMLInputElement;
    if (isInputEditing || new URLSearchParams(window.location.search).get("q")) {
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
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isExpanded, isInputEditing]);

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
                    className={`btn border dark:border-darkmode-border ${layout === "list" ? "btn-outline-primary" : "btn-primary"
                      } p-2 hover:scale-105 duration-300`}
                  >
                    <BsGridFill />
                  </button>
                  <button
                    onClick={() => layoutChange("list")}
                    className={`btn border dark:border-darkmode-border ${layout === "list" ? "btn-primary" : "btn-outline-primary"
                      } p-2 hover:scale-105 duration-300`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>

              <div className="flex gap-x-8">
                <div className="filter-button-container block lg:hidden mt-1">
                  <button {...getToggleProps()}>
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
                  <DropdownMenu list={sorting} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 lg:col-3">
            <div className="lg:block relative">
              <div className="block lg:hidden w-full">
                <section
                  className="collapse-container-class z-20 bg-body dark:bg-darkmode-body w-full px-4 rounded-md"
                  {...getCollapseProps()}
                >
                  <div className="pb-8">
                    <ProductFilters
                      collections={categories}
                      vendors={vendors}
                      tags={tags}
                      maxPriceData={maxPriceData}
                      vendorsWithCounts={vendorsWithCounts}
                      categoriesWithCounts={categoriesWithCounts}
                    />
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
