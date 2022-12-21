import MathUtils from "../../utils/MathUtils";
import { Vector3 } from "../transforms/Vector3";


/**
 * AABB边界框
 */
export default class Bounds3 {

    min: Vector3 = null!;
    max: Vector3 = null!;

    constructor(a?: Vector3, b?: Vector3) {
        const minNum = Number.MIN_SAFE_INTEGER;
        const maxNum = Number.MAX_SAFE_INTEGER;
        if (a == undefined && b == undefined) {
            this.min = new Vector3(maxNum, maxNum, maxNum);
            this.max = new Vector3(minNum, minNum, minNum);
            return
        }
        this.min = new Vector3();
        this.max = new Vector3();
        if (a != undefined && b != undefined) {
            this.setValue(a, b);
            return;
        } else if (a != undefined) {
            a.copyTo(this.min);
            a.copyTo(this.max);
        } else if (b != undefined) {
            b.copyTo(this.min);
            b.copyTo(this.max);
        }
    }

    setValue(a: Vector3, b: Vector3): void {
        this.min.setValue(
            Math.min(a.x, b.x),
            Math.min(a.y, b.y),
            Math.min(a.z, b.z));
        this.max.setValue(
            Math.max(a.x, b.x),
            Math.max(a.y, b.y),
            Math.max(a.z, b.z));
    }

    set(value: Bounds3): void {
        value.min.copyTo(this.min);
        value.max.copyTo(this.max);
    }

    /**
     * 相等
     * @param value 
     * @returns 
     */
    equals(value: Bounds3): boolean {
        return this.min.equals(value.min) && this.max.equals(value.max);
    }

    /**
     * 获取AABB包围盒的特定点
     * @param c 
     * @param result 
     * @returns 
     */
    corner(c: number, result?: Vector3): Vector3 {
        result = result || new Vector3();
        if (c < 0 || c >= 8) {
            throw new Error("corner 必须在0-7之间!");
        }
        result.x = this.__getIndex(c & 1).x;
        result.y = this.__getIndex((c & 2) ? 1 : 0).y;
        result.z = this.__getIndex((c & 4) ? 1 : 0).z;
        return result;
    }

    /**
     * 判断是否包含点P
     * @param p 
     * @returns 
     */
    inside(p: Vector3): boolean {
        return Bounds3.inside(p, this);
    }

    /**
     * 扩大
     * @param delta 
     */
    expand(delta: number): void {
        Bounds3.expand(this, delta);
    }

    /**
     * 从min到max的向量（对角线）
     * @param result 
     * @returns 
     */
    diagonal(result?: Vector3): Vector3 {
        result = result || new Vector3();
        result.x = this.max.x - this.min.x;
        result.y = this.max.y - this.min.y;
        result.z = this.max.z - this.min.z;
        return result;
    }

    /**
     * 计算六个面的表面积
     * @returns 
     */
    surfaceArea(): number {
        let d = this.diagonal(Vector3.tmp0);
        return 2 * (d.x * d.y + d.x * d.z + d.y * d.z);
    }

    /**
     * 体积
     */
    volume(): number {
        let d = this.diagonal(Vector3.tmp0);
        return d.x * d.y * d.z;
    }

    /**
     * 返回三轴中的最长的那个的索引
     * @returns 
     */
    maximumExtent(): number {
        let d = this.diagonal(Vector3.tmp0);
        if (d.x > d.y && d.x > d.z) {
            return 0;
        } else if (d.y > d.z) {
            return 1;
        }
        return 2;
    }

    /**
     * 插值
     * @param t 
     * @param result 
     */
    lerp(t: Vector3, result?: Vector3): Vector3 {
        result = result || new Vector3();
        result.x = MathUtils.lerp(t.x, this.min.x, this.max.x);
        result.y = MathUtils.lerp(t.y, this.min.y, this.max.y);
        result.z = MathUtils.lerp(t.z, this.min.z, this.max.z);
        return result;
    }

    /**
     * 获取边界框的中心点和半径
     * @param center 
     */
    boundingSphere(center: Vector3): number {
        let a = Vector3.add(this.min, this.max, Vector3.tmp0).scale(0.5);
        center.setValue(a.x, a.y, a.z);
        if (this.inside(center)) {
            return Vector3.distance(center, this.max);
        }
        return 0;
    }

    /**
     * 合并
     * @param bounds 
     * @param p 
     * @param result 
     * @returns 
     */
    static unionPoint(bounds: Bounds3, p: Vector3, result?: Bounds3): Bounds3 {
        result = result || new Bounds3();
        result.min.setValue(
            Math.min(bounds.min.x, p.x),
            Math.min(bounds.min.y, p.y),
            Math.min(bounds.min.z, p.z));
        result.max.setValue(
            Math.max(bounds.max.x, p.x),
            Math.max(bounds.max.y, p.y),
            Math.max(bounds.max.z, p.z));
        return result;
    }

    /**
     * 合并
     * @param a 
     * @param b 
     * @param result 
     */
    static union(a: Bounds3, b: Bounds3, result?: Bounds3): Bounds3 {
        result = result || new Bounds3();
        result.min.setValue(
            Math.min(a.min.x, b.min.x),
            Math.min(a.min.y, b.min.y),
            Math.min(a.min.z, b.min.z));
        result.max.setValue(
            Math.max(a.max.x, b.max.x),
            Math.max(a.max.y, b.max.y),
            Math.max(a.max.z, b.max.z));
        return result;
    }

    /**
     * 连个AABB之间的交集
     * @param a 
     * @param b 
     * @param result 
     * @returns
     */
    static intersect(a: Bounds3, b: Bounds3, result?: Bounds3): Bounds3 {
        result = result || new Bounds3();
        result.min.setValue(
            Math.max(a.min.x, b.min.x),
            Math.max(a.min.y, b.min.y),
            Math.max(a.min.z, b.min.z));
        result.max.setValue(
            Math.min(a.max.x, b.max.x),
            Math.min(a.max.y, b.max.y),
            Math.min(a.max.z, b.max.z),
        )
        return result;
    }

    /**
     * 判断是否相交
     * @param b1 
     * @param b2 
     */
    static overlaps(b1: Bounds3, b2: Bounds3): boolean {
        let x = (b1.max.x >= b2.min.x) && (b1.min.x <= b2.max.x);
        let y = (b1.max.y >= b2.min.y) && (b1.min.y <= b2.max.y);
        let z = (b1.max.z >= b1.min.z) && (b1.min.z <= b2.max.z);
        return x && y && z;
    }

    /**
     * 判断点是否在范围内
     * @param p 
     */
    static inside(p: Vector3, b: Bounds3): boolean {
        return p.x >= b.min.x && p.x <= b.max.x && p.y >= b.min.y && p.y <= b.max.y && p.z >= b.min.z && p.z <= b.max.z;
    }

    /**
     * 判断点是否在范围内(不包含边界点)
     * @param p 
     * @param b 
     * @returns 
     */
    static insideExclusive(p: Vector3, b: Bounds3): boolean {
        return p.x >= b.min.x && p.x < b.max.x && p.y >= b.min.y && p.y < b.max.y && p.z >= b.min.z && p.z < b.max.z;
    }

    /**
     * 扩大
     * @param b 
     * @param delta 
     * @param result 
     */
    static expand(b: Bounds3, delta: number, result?: Bounds3): Bounds3 {
        result = result || new Bounds3();
        result.min.setValue(
            b.min.x - delta,
            b.min.y - delta,
            b.min.z - delta);
        result.max.setValue(
            b.max.x + delta,
            b.max.y + delta,
            b.max.z + delta);
        return result;
    }

    /**
     * 偏移
     * @param p 
     * @param result 
     */
    static offset(p: Vector3, bounds: Bounds3, result?: Vector3): Vector3 {
        result = result || new Vector3();
        Vector3.subtract(p, bounds.min, result);
        if (bounds.max.x > bounds.min.x) {
            result.x /= bounds.max.x - bounds.min.x;
        }
        if (bounds.max.y > bounds.min.y) {
            result.y /= bounds.max.y - bounds.min.y;
        }
        if (bounds.max.z > bounds.min.z) {
            result.z /= bounds.max.z - bounds.min.z;
        }
        return result;
    }

    private __getIndex(idx: number): Vector3 {
        return idx == 0 ? this.min : this.max;
    }
}