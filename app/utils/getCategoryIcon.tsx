"use client";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaBeer, FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { IconType } from "react-icons";

const getCategoryIcon: (label: string) => IconType = (label) => {
  let icon = FaBeer;
  switch (label) {
    case "Beach":
      icon = TbBeach;
      break;
    case "Windmills":
      icon = GiWindmill;
      break;
    case "Modern":
      icon = MdOutlineVilla;
      break;
    case "Countryside":
      icon = TbMountain;
      break;
    case "Pools":
      icon = TbPool;
      break;
    case "Islands":
      icon = GiIsland;
      break;
    case "Lake":
      icon = GiBoatFishing;
      break;
    case "Skiing":
      icon = FaSkiing;
      break;
    case "Castles":
      icon = GiCastle;
      break;
    case "Caves":
      icon = GiCaveEntrance;
      break;
    case "Camping":
      icon = GiForestCamp;
      break;
    case "Arctic":
      icon = BsSnow;
      break;
    case "Desert":
      icon = GiCactus;
      break;
    case "Barns":
      icon = GiBarn;
      break;
    case "Lux":
      icon = IoDiamond;
      break;
    default:
      break;
  }

  return icon;
};

export default getCategoryIcon;
