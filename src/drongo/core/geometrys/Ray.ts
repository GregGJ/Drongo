import { Vector3 } from "../transforms/Vector3";



/**
 * 射线
 */
export default class Ray {

    /**
     * 起点
     */
    o: Vector3 = null!;

    /**
     * 方向
     */
    d: Vector3 = null!;

    max?: number;

    time:number=0;

    constructor(o: Vector3, d: Vector3, time: number = 0, max?: number) {
        this.o = o;
        this.d = d;
        this.max = max;
        this.time=time;
    }

    /**
     * 获取射线上的点
     * @param t 
     * @param result 
     * @returns 
     */
    getPoint(t: number, result?: Vector3): Vector3 {
        result = result || new Vector3();
        Vector3.addScaled(this.o, this.d, t, result);
        return result;
    }
}