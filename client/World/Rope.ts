export class Rope {
    //WIP
    constructor (private _handle:number) {
        console.warn('ROPE WIP')
    }
    getRopeFlags(): number {
        return GetRopeFlags(this._handle);
    }

    getRopeLengthChangerRate(): number {
        return GetRopeLengthChangeRate(this._handle);
    }

    getRopeTimeMultiplier(): number {
        return GetRopeTimeMultiplier(this._handle);
    }

    getRopeUpdateOrder(): number {
        return GetRopeUpdateOrder(this._handle);
    }
}