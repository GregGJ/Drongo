import { Vector3 } from "../core/transforms/Vector3";

export default class MathUtils {

    /**
     * 小于此值的所有绝对值都被认为等于零
     */
    static readonly zeroTolerance: number = 1e-6;

    /**度到弧度的换算系数*/
    static readonly deg2Rad: number = Math.PI / 180;

    /**弧度到度的换算系数*/
    static readonly rad2Deg: number = 180 / Math.PI;

    /**
    * 数组数据容器类型
    */
    static ArrayType: typeof Float32Array | typeof Float64Array | typeof Array = Float32Array;

    /**
     * 设置数组数据容器类型
     * @param type
     */
    static setArrayType(type: typeof Float32Array | typeof Float64Array | typeof Array): void {
        MathUtils.ArrayType = type;
    }

    /**
     * 检测是否相等(误差1e-6)
     * @param a
     * @param b
     * @returns true 相等 false不相等
     */
    static equals(a: number, b: number): boolean {
        return Math.abs(a - b) <= MathUtils.zeroTolerance;
    }

    /**
     * 判断是否时2的幂
     * @param v
     * @returns 
     */
    static isPowerOf2(v: number): boolean {
        return (v & (v - 1)) === 0;
    }

    static lerp(min: number, max: number, t: number = 0): number {
        return (1 - t) * min + t * max;
    }
}