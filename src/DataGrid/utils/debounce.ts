// based on https://github.com/chodorowicz/ts-debounce/blob/master/src/index.ts
export type Procedure = (...args: any[]) => void;

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 300
): F {
  let timeoutId: any;

  return function(this: any, ...args: any[]) {
    const context = this;

    const doLater = function() {
      timeoutId = undefined;
      func.apply(context, args);
    }

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);
  } as any
}