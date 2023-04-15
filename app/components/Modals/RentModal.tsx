"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import categories from "@/app/data/categories";
import CategorySelect from "../Inputs/CategorySelect";
import CountrySelect from "../Inputs/CountrySelect";
import Input from "../Inputs/Input";

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

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  // todo: watchers
  const category = watch("category");
  const location = watch("location");

  const setCustomValue = (id: string, value: any) => {
    console.log("setValue", id, value);
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const DynamicMap = useMemo(
    () =>
      dynamic(() => import("../MapLeaflet"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location],
  );

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

  let bodyContent = <>step {step + 1} is coming soon!</>;

  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Which of these best describes your place?" subtitle={`step ${step + 1}: Pick a category`} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategorySelect
                  onClick={(cat: string) => {
                    setCustomValue("category", cat);
                  }}
                  selected={category === item.label}
                  label={item.label}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Where is your place located?" subtitle={`step ${step + 1}: Help guests find you!`} />
          <CountrySelect value={location} onChange={(value) => setCustomValue("location", value)} />
          <DynamicMap center={location?.latlng} />
        </div>
      );
      break;
    case STEPS.DESCRIPTION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your place?"
            subtitle={`step ${step + 1}: Short and sweet works best!`}
          />
          <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
      break;
    case STEPS.PRICE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Now, set your price" subtitle={`step ${step + 1}: How much do you charge per night?`} />
          <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
      break;
    default:
      break;
  }

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
