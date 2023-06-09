"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import qs, { UrlObject } from "query-string";
import { Range } from "react-date-range";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import Heading from "../Heading";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import Number from "../Inputs/Number";
import { initialDateRange } from "@/app/constants";
import DatePicker from "../Inputs/DatePicker";
import { useRouter, useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

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

    const currentQuery = params ? qs.parse(params.toString()) : {};

    const updatedQuery: { [key: string]: string | number } = {
      ...currentQuery,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (location) updatedQuery.locationValue = location.value;
    if (dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate);
    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    console.log("search listings", updatedQuery);

    const obj: UrlObject = { url: "/", query: updatedQuery };
    const url = qs.stringifyUrl(obj, { skipNull: true });

    router.push(url);
  };

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? "Search" : "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.LOCATION ? undefined : "Back";
  }, [step]);

  let bodyContent;

  switch (step) {
    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Where do you wanna go?" subtitle="Find the perfect location!" />
          <CountrySelect value={location} onChange={(value) => setLocation(value)} />
          <hr />
          <Map center={location?.latlng} />
        </div>
      );
      break;
    case STEPS.DATE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
          <DatePicker onChange={(value) => setDateRange(value.selection)} value={dateRange} />
        </div>
      );
      break;
    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="More information" subtitle="Find your perfect place!" />
          <Number
            onChange={(value) => setGuestCount(value)}
            value={guestCount}
            title="Guests"
            subtitle="How many guests are coming?"
          />
          <hr />
          <Number
            onChange={(value) => setRoomCount(value)}
            value={roomCount}
            title="Rooms"
            subtitle="How many rooms do you need?"
          />
          <hr />
          <Number
            onChange={(value) => {
              setBathroomCount(value);
            }}
            value={bathroomCount}
            title="Bathrooms"
            subtitle="How many bahtrooms do you need?"
          />
        </div>
      );
      break;
    default:
      break;
  }

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
