"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log("post data", data);
    // axios post
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const renderInput = (id: string, label: string, type = "text") => (
    <Input id={id} label={label} disabled={isLoading} register={register} errors={errors} required type={type} />
  );

  const registerInputs = () => (
    <>
      {renderInput("email", "Email")}
      {renderInput("name", "Name")}
      {renderInput("password", "Password", "password")}
    </>
  );

  const registerButtons = () => (
    <>
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn("github")} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">
            Log in
          </span>
        </p>
      </div>
    </>
  );

  const title = "Welcome to Airbnb";
  const subtitle = "Create an account!";

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={title} subtitle={subtitle} />
      {registerInputs()}
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {registerButtons()}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register New User"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
