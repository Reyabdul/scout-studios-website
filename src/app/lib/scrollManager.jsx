let isLocked = false;

export const scrollLock = {
  get locked() { return isLocked; },
  lock()   { isLocked = true; },
  unlock() { isLocked = false; },
};