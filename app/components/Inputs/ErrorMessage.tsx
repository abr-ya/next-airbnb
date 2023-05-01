"use client";

import { FC } from "react";

interface IErrorMessage {
  text?: string;
}

const ErrorMessage: FC<IErrorMessage> = ({ text = "Please, fill this field!" }) => {
  return <div className="text-rose-500">{text}</div>;
};

export default ErrorMessage;
