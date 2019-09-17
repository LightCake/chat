import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  // Change boolean value in the state to the current opposite of it
  function toggle() {
    setIsShowing(!isShowing);
  }
  // Returns state value and the function to change the state
  return {
    isShowing,
    toggle
  };
};

export default useModal;
