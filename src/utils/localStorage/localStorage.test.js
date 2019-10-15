import {
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage
} from './localStorage';

describe('localStorage', () => {
  const key = 'testKey';
  const value = 'test values are fun';

  it('saveToLocalStorage', () => {
    expect(saveToLocalStorage(key, value)).toEqual(true);
  });

  it('getFromLocalStorage', () => {
    expect(getFromLocalStorage(key)).toEqual(value);
  });

  it('removeFromLocalStorage', () => {
    expect(removeFromLocalStorage(key)).toEqual(true);
  });
});