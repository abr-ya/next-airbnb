"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import useEditPinModal from "@/app/hooks/useEditPinModal";

import Modal from "./Modal";
import Heading from "../Heading";
import MapBox from "../MapBox";
import { ICoord } from "@/app/types";
import axios from "axios";

const EditPinModal: FC = () => {
  const router = useRouter();
  const editPinModal = useEditPinModal();

  const [isLoading, setIsLoading] = useState(false);
  const [coord, setCoord] = useState<ICoord | null>(null);

  const onSave = () => {
    setIsLoading(true);

    const data = {
      pin: {
        lat: coord?.lat,
        lon: coord?.lng,
      },
    };

    console.log("save data", data);

    // axios patch
    axios
      .patch(`/api/listings/${editPinModal.id}`, data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        editPinModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const title = "Set Pin!";
  const subtitle = "Update coordinates your object...";

  // todo: получать при открытии!
  const init = {
    latitude: 50.08,
    longitude: 14.42,
    zoom: 11,
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={title} subtitle={subtitle} />
      <div className="h-[400px]">
        <MapBox initView={init} coordHandler={setCoord} />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editPinModal.isOpen}
      title="Edit Coordinates"
      actionLabel="Save"
      onClose={editPinModal.onClose}
      onSubmit={onSave}
      body={bodyContent}
    />
  );
};

export default EditPinModal;
