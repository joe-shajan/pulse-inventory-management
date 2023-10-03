"use client";

import { useState } from "react";

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };
  const openModal = () => {
    setisOpen(true);
  };
  const closeModal = () => {
    setisOpen(false);
  };

  return {
    isOpen,
    toggle,
    openModal,
    closeModal,
  };
}
