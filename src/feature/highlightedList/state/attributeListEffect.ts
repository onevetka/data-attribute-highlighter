export type AttributeListEffect = SaveAttributeToChromeStorageEffect;

export interface SaveAttributeToChromeStorageEffect {
  type: 'saveAttributeToChromeStorage';
  payload: any;
}
