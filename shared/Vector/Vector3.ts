export class Vector3 {
  constructor(
    public x: number,
    public y: number,
    public z: number,
  ) {}
  static distanceBetween(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    const hypot = dx * dx + dy * dy + dz * dz;
    return Math.sqrt(hypot);
  }
  static fromArray(numericArray: [number, number, number]): Vector3 | undefined {
    if (numericArray.length !== 3) {
      console.error('[Shared] Vector3.fromArray: Array requires 3 numerical elements inside.');
      return undefined;
    }
    const isElementsNumerical: boolean =
      typeof numericArray[0] === 'number' && typeof numericArray[1] === 'number' && typeof numericArray[2] === 'number';
    if (!isElementsNumerical) {
      console.error('[Shared] Vector3.fromArray: Function requires to every element to be number!');
      return undefined;
    }
    return new this(numericArray[0], numericArray[1], numericArray[2]);
  }
  static isInPoint(inputPosition: Vector3, targetPosition: Vector3, tolerancy: number): boolean {
    return (
      this.distanceBetween(
        inputPosition.x,
        inputPosition.y,
        inputPosition.z,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
      ) <= tolerancy
    );
  }
}
