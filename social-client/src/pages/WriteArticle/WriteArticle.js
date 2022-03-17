import React, { useState, useRef, useEffect } from "react";

const WriteArticle = () => {
  const [highlighted, setHighlighted] = useState(false);
  const searchInput = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          console.log("You clicked outside of me!");
          setHighlighted(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(searchInput);

  document.onmouseup = () => {
    window.getSelection().toString().length > 0 &&
    document.activeElement === searchInput.current
      ? setHighlighted(true)
      : setHighlighted(false);
  };

  return (
    <div style={{ marginTop: "150px" }}>
      {highlighted && <div>"fdgdfgdfgdfgfd"</div>}
      dsfsfdsf
      <input type="text" ref={searchInput} />
    </div>
  );
};

export default WriteArticle;
