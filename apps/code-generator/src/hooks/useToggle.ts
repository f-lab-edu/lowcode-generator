import { useState } from "react";

export function useToggle(initialToggle: boolean) {
  const [toggleValue, setToggleValue] = useState<boolean>(initialToggle);

  const toggle = () => setToggleValue(!toggleValue);

  return {
    on: toggleValue,
    toggle,
  };
}
