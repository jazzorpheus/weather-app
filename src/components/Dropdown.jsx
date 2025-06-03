// React Hooks
import { useState, useEffect, useRef } from "react";

// My components
import Panel from "./Panel";

// Icons
import { GoChevronUp } from "react-icons/go";
import { TiTick } from "react-icons/ti";

import classNames from "classnames";

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  className,
}) {
  // Add classnames passed as props
  const finalClassNames = classNames(className);

  // Used to toggle dropdown menu on or off
  const [isExpanded, setIsExpanded] = useState(false);

  // Connect 'divEl' to root "div element" to be used to listen for clicks
  const divEl = useRef();

  // Listen for clicks and determine if they're 'inside' or 'outside' Dropdown
  useEffect(() => {
    const handler = (event) => {
      // Check to see if divEl null
      if (!divEl.current) {
        return;
      }
      // Check to see if click event was within the Dropdown
      if (!divEl.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    // NOTE: 3rd argument (true) ensures browser watches for clicks during
    // the 'capture' phase
    document.addEventListener("click", handler, true);

    // Clean Up
    // If component removed from screen, remove event listener
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  // Control whether dropDown menu showing or not
  const handleToggle = () => {
    // New value of state dependent on old value so using full callback
    // inside of setState
    setIsExpanded((curr) => !curr);
  };

  // Function to run onChange (set selection) AND close dropdown menu!
  // (Necessary since handleToggle func is declared here and not in the parent where onChange is created.)
  const handleOnChange = (option) => {
    // Set state value (defined in parent)
    onChange(option);
    // Close dropdown
    handleToggle();
  };

  // Generate HTML for displaying options and pass each element handleOnChange
  const dropMenu = options.map((option, idx) => {
    return (
      <li
        key={idx}
        className="flex justify-start hover:bg-blue-600 rounded-lg cursor-pointer list-none text-sm p-1"
        onClick={() => handleOnChange(option)}
      >
        {value?.value === option.value && <TiTick className="mr-1" />}
        {option.label}
      </li>
    );
  });

  return (
    <div ref={divEl} className={finalClassNames}>
      <Panel
        className="flex justify-around items-center cursor-pointer text-sm bg-gradient-to-t from-blue-900 to-zinc-900 border border-[rgba(209,213,219,0.8)]"
        onClick={handleToggle}
      >
        {value?.label || label} <GoChevronUp className="text-lg" />
      </Panel>
      {isExpanded && (
        <Panel className="absolute bottom-full w-[130px] bg-gradient-to-t from-zinc-900 to-blue-900">
          {dropMenu}
        </Panel>
      )}
    </div>
  );
}
