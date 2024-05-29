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

  // useRef can be used to create a reference to an element/value created by this component in the DOM.
  // Need to connect 'divEl' to the root "div element" by giving it an attr/prop called "ref={divEl}" [see below].
  // divEl now gives us an object that has a 'current' property that contains a pointer referring to the root div
  // element that we need.
  const divEl = useRef();

  // Need to listen for clicks and determine if it is 'inside' our Dropdown component or 'outside' of it.
  useEffect(() => {
    const handler = (event) => {
      // First check to see if divEl is null (might have removed element from screen).
      if (!divEl.current) {
        return;
      }
      // Check to see if click event was within the Dropdown;
      // if not, need to simply close dropMenu.
      // REMEMBER to access the ".current" property of divEl!
      if (!divEl.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    // NOTE: 3rd argument (true) ensures browser watches for clicks during
    // the 'capture' phase [see vid. 211]
    document.addEventListener("click", handler, true);

    // cleanUp function
    // If component happens to be removed from screen, it is important to remove
    // this event listener.
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  // Control whether dropDown menu is showing or not
  const handleToggle = () => {
    // New value of state dependent on old value so use full callback version
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

  // Generate HTML for displaying options and pass each element handleSelect
  const dropMenu = options.map((option, idx) => {
    return (
      <li
        key={idx}
        className="flex justify-start hover:bg-gray-700 rounded cursor-pointer list-none text-sm p-1"
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
        className="flex justify-around items-center cursor-pointer text-sm"
        onClick={handleToggle}
      >
        {value?.label || label} <GoChevronUp className="text-lg" />
      </Panel>
      {isExpanded && (
        <Panel className="absolute bottom-full w-[130px]">{dropMenu}</Panel>
      )}
    </div>
  );
}
