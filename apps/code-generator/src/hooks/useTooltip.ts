import { useState } from "react";
export const useTooltip = (duration = 2000) => {
  const [show, setShow] = useState(false);

  const trigger = <T>(fn: () => T | Promise<T>) => {
    try {
      const result = fn();

      // Promise인 경우
      if (result instanceof Promise) {
        return result
          .then((value) => {
            setShow(true);
            setTimeout(() => setShow(false), duration);
            return value;
          })
          .catch(() => {
            // 실패 시 표시 안 함
            setShow(false);
          });
      }

      // 동기 함수인 경우
      setShow(true);
      setTimeout(() => setShow(false), duration);
      return result;
    } catch {
      setShow(false);
    } finally {
      setShow(false);
    }
  };

  return { show, trigger };
};
