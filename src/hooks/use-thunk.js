// React Hooks
import { useState, useCallback } from "react";

// React-Redux
import { useDispatch } from "react-redux";

function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      // dispatch() returns a promise, EXCEPT its .then function ALWAYS gets called,
      // regardless of whether the promise was fulfilled or rejected.
      // The argument taken by .then(), e.g. .then((arg)), is the fulfilled or
      // rejected action object. This makes things awkward.
      // Instead, can 'unwrap' the promise and then it works as normal.
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}

export { useThunk };
