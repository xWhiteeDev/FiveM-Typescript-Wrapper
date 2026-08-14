export class Vector3 {

    constructor (public x:number,public y:number, public z:number) {

    }
    static fromArray(arr:number[]) {
        return {x:arr[0], y:arr[1], z:arr[2]}
    }
}