"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import { toast } from "react-toastify";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    console.log("back");
    setStep((value) => value - 1);
  };

  const onNext = () => {
    console.log("next");
    setStep((value) => value + 1);
  };

  const defaultValues = {
    category: "",
    location: null,
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: "",
    price: 1,
    title: "",
    description: "",
  };

  const { handleSubmit, reset } = useForm<FieldValues>({ defaultValues });

  // todo: watchers

  // todo: Create Map

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    console.log("post", data);

    // todo: axios post data
    setIsLoading(true);
    toast.success("Отправить данные!", {
      onClose: () => {
        setIsLoading(false);
        reset();
        setStep(STEPS.CATEGORY);
      },
      autoClose: 5000,
    });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describes your place?" subtitle={`step ${step}: Pick a category`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">todo: Category Select!</div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
