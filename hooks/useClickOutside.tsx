import { RefObject, useEffect } from "react";

export function useClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !target.closest(".filter-button")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, isOpen, onClose]);
}
