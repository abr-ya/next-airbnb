"use client";

import React, { FC } from "react";

interface IMenuItem {
  onClick: () => void;
  label: string;
}

const MenuItem: FC<IMenuItem> = ({ label, onClick }) => (
  <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
    {label}
  </div>
);

export default MenuItem;
