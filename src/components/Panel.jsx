import classNames from "classnames";

// A simple reusable panel component with some preconfigured styling.
export default function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames("panel rounded-2xl p-1.5", className);

  return (
    <div className={finalClassNames} {...rest}>
      {children}
    </div>
  );
}
