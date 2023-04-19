"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Heading from "../Heading";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();

  const Map = useMemo(
    () =>
      dynamic(() => import("../MapLeaflet"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location],
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const searchHandler = () => {
    if (step !== STEPS.INFO) return onNext();

    const params = {
      location,
    };
    console.log("search", params);
  };

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? "Search" : "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.LOCATION ? undefined : "Back";
  }, [step]);

  const bodyContent = <div className="flex flex-col gap-8">Search modal step: {step + 1}</div>;

  return (
    <Modal
      title="Search Listings"
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchHandler}
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;
