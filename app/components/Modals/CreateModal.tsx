"use client";

import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

import useCreateModal from "@/app/hooks/useCreateModal";
import categories from "@/app/data/categories";
import Modal from "./Modal";
import Heading from "../Heading";
import { CategorySelect, CountrySelect, ImageUpload, Input, NumberInput } from "../Inputs";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const CreateModal = () => {
  const router = useRouter();
  const createModal = useCreateModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
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
    lat: 50.09,
    lon: 14.41,
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  // const lat = watch("lat");
  // const lon = watch("lon");

  const setCustomValue = (id: string, value: any) => {
    console.log("setValue", id, value);
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const setGuestCount = (value: number) => setCustomValue("guestCount", value);
  const setRoomCount = (value: number) => setCustomValue("roomCount", value);
  const setBathroomCount = (value: number) => setCustomValue("bathroomCount", value);

  const TEXT = {
    [STEPS.INFO]: {
      TITLE: "Share some basics about your place",
      SUBTITLE: "What amenitis do you have?",
      GUEST_TITLE: "Guests",
      GUEST_SUBTITLE: "How many guests do you allow?",
      ROOM_TITLE: "Rooms",
      ROOM_SUBTITLE: "How many rooms do you have?",
      BATHROOM_TITLE: "Rooms",
      BATHROOM_SUBTITLE: "How many bathrooms do you have?",
    },
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

    data.pin = {
      lat: data.lat,
      lon: data.lon,
    };
    delete data.lat;
    delete data.lon;

    console.log("post", data);

    // todo: axios post data
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        createModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
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

  let bodyContent;

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
          <Controller
            name="location"
            control={control}
            render={() => (
              <CountrySelect
                value={location}
                onChange={(value) => setCustomValue("location", value)}
                isError={!!errors?.location}
              />
            )}
            rules={{ required: true }}
          />
          <DynamicMap center={location?.latlng} />
        </div>
      );
      break;
    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title={TEXT[STEPS.INFO].TITLE} subtitle={TEXT[STEPS.INFO].SUBTITLE} />
          <NumberInput
            onChange={setGuestCount}
            value={guestCount}
            title={TEXT[STEPS.INFO].GUEST_TITLE}
            subtitle={TEXT[STEPS.INFO].GUEST_SUBTITLE}
          />
          <hr />
          <NumberInput
            onChange={setRoomCount}
            value={roomCount}
            title={TEXT[STEPS.INFO].ROOM_SUBTITLE}
            subtitle={TEXT[STEPS.INFO].ROOM_SUBTITLE}
          />
          <hr />
          <NumberInput
            onChange={setBathroomCount}
            value={bathroomCount}
            title={TEXT[STEPS.INFO].BATHROOM_SUBTITLE}
            subtitle={TEXT[STEPS.INFO].BATHROOM_SUBTITLE}
          />
        </div>
      );
      break;
    case STEPS.IMAGE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!" />
          <ImageUpload onChange={(value) => setCustomValue("imageSrc", value)} value={imageSrc} />
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
      isOpen={createModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={createModal.onClose}
      body={bodyContent}
    />
  );
};

export default CreateModal;
