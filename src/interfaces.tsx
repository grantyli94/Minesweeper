export type Point = [y: number, x: number];

export interface Mapper {
  [key: string]: string;
}

export interface Settings {
  [key: string]: DifficultySetting;
}

export interface DifficultySetting {
  [key: string]: number;
}