export function cartesianProduct<S, T, U>(a1: S[], a2: T[], constructor: (s: S, t: T) => U): U[] {
  return a1.reduce((acc1, s) => a2.reduce((acc2, t) => [...acc2, constructor(s, t)], acc1), [] as U[]);
}

export function flatten<T>(acc: T[], cur: T[]): T[] {
  return [...acc, ...cur];
}
