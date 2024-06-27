import classNames from "classnames";

// A simple reusable panel component with some preconfigured styling.
// NOTE: "className" prop ensures any additional classNames provided by engineer get added.
// REMEMBER: "...rest" refers to any additional props that might be passed, e.g. onClick etc.
// "children" is very important prop to include as it will include anything nested inside the panel.
export default function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames(
    "panel rounded-2xl p-1.5 w-full",
    className
  );

  return (
    <div className={finalClassNames} {...rest}>
      {children}
    </div>
  );
}
