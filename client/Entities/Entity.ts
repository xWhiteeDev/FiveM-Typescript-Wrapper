import type { LocalPlayer } from './LocalPlayer';
import type { Vehicle } from './Vehicle';
import type { WorldObject } from '../World/WorldObject';

export type Entity = Vehicle | LocalPlayer | WorldObject | null;
