"use client";

import { usePathname, useSearchParams } from "next/navigation";

import categories from "@/app/data/categories";
import CategoryBox from "../CategoryBox";
import Container from "../Container";
import getIcon from "../../utils/getCategoryIcon";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map(({ label }) => (
          <CategoryBox key={label} label={label} icon={getIcon(label)} selected={category === label} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
