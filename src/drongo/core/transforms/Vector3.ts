import MathUtils from "../../utils/MathUtils";



export class Vector3 {

    static tmp_Vec3_0: Vector3 = new Vector3();
    static tmp_Vec3_1: Vector3 = new Vector3();
    static tmp_Vec3_2: Vector3 = new Vector3();

    private __elements: Float32Array | Float64Array | Array<number>;

    constructor(x?: number, y?: number, z?: number) {
        this.__elements = new MathUtils.ArrayType(3);
        this.__elements[0] = (x === undefined || x === null || isNaN(x)) ? 0 : x;
        this.__elements[1] = (y === undefined || y === null || isNaN(y)) ? 0 : y;
        this.__elements[2] = (z === undefined || z === null || isNaN(z)) ? 0 : z;
    }

    /**
     * 设置值
     * @param x 
     * @param y 
     * @param z 
     */
    setValue(x: number, y?: number, z?: number): void {
        this.x = x;
        if (this.y != undefined) {
            this.y = y!;
        }
        if (this.z != undefined) {
            this.z = z!;
        }
    }

    /**X分量 */
    get x(): number {
        return this.__elements[0];
    }

    set x(value: number) {
        if (this.__elements[0] == value) {
            return;
        }
        this.__elements[0] = value;
    }

    /**Y分量 */
    get y(): number {
        return this.__elements[1];
    }

    set y(value: number) {
        if (this.__elements[1] == value) {
            return;
        }
        this.__elements[1] = value;
    }

    /**Z分量 */
    get z(): number {
        return this.__elements[2];
    }

    set z(value: number) {
        if (this.__elements[2] == value) {
            return;
        }
        this.__elements[2] = value;
    }

    /**
     * 获取x,y,z中最小的那个值
     */
    get minComponent(): number {
        return Math.min(this.x, Math.min(this.y, this.z));
    }

    /**
     * 获取x,y,z中最大的那个值
     */
    get maxComponent(): number {
        return Math.max(this.x, Math.max(this.y, this.z));
    }

    /**元素集合 */
    get elements(): Float32Array | Float64Array | Array<number> {
        return this.__elements;
    }

    /**
     * 向量的长度
     */
    get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    /**
     * 向量长度的平方
     */
    get lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * 向量归一化
     * @returns 改变并返回自身
     */
    normalizeSelf(): Vector3 {
        return Vector3.normalize(this, this);
    }

    /**
     * 向量取反
     * @returns 改变并返回自身
     */
    negateSelf(): Vector3 {
        return Vector3.negate(this, this);
    }

    /**
     * 向量加法
     * @param b 
     * @returns  改变并返回自身
     */
    add(b: Vector3): Vector3 {
        return Vector3.add(this, b, this);
    }

    /**
     * 向量减法
     * @param b 
     * @returns  改变并返回自身
     */
    subtract(b: Vector3): Vector3 {
        return Vector3.subtract(this, b, this);
    }

    /**
     * 向量与标量的乘法(缩放向量)
     * @param k 
     * @returns  改变并返回自身
     */
    scale(k: number): Vector3 {
        return Vector3.scale(k, this, this);
    }

    /**
     * 克隆
     * @returns 
     */
    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * 复制
     * @param out 
     * @returns 
     */
    copyTo(out: Vector3): Vector3 {
        out.x = this.x;
        out.y = this.y;
        out.z = this.z;
        return out;
    }

    toString(): string {
        return "x:" + this.x + " y:" + this.y + " z:" + this.z;
    }

    //==========================================================static==============================================================//
    //==========================================================static==============================================================//
    //==========================================================static==============================================================//

    /**
     * 求两个点的欧式距离
     * @param a 
     * @param b 
     */
    static distance(a: Vector3, b: Vector3): number {
        const x: number = b.x - a.x;
        const y: number = b.y - a.y;
        const z: number = b.z - a.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    /**
     * 求两个点之间的欧式距离二次方
     * @param a 
     * @param b 
     * @returns 
     */
    static distanceSquared(a: Vector3, b: Vector3): number {
        const x: number = b.x - a.x;
        const y: number = b.y - a.y;
        const z: number = b.z - a.z;
        return x * x + y * y + z * z;
    }

    /**
     * 向量归一化
     * @param value 
     * @param out 
     * @returns         out为null时返回一个新的Vector3对象，否则使用传入
     */
    static normalize(value: Vector3, out?: Vector3): Vector3 {
        out = out || new Vector3();
        const { x, y, z } = value;
        if (value.length > 0) {
            const len = 1.0 / value.length;
            out.x = x * len;
            out.y = y * len;
            out.z = z * len;
        }
        return out;
    }


    /**
     * 向量取反并返回
     * @param a 
     * @param out 
     * @returns 
     */
    static negate(a: Vector3, out: Vector3): Vector3 {
        out.x = -a.x;
        out.y = -a.y;
        out.z = -a.z;
        return out;
    }

    /**
     * 向量加法
     * @param a 
     * @param b 
     * @param out 
     * @returns 
     */
    static add(a: Vector3, b: Vector3, out: Vector3): Vector3 {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        out.z = a.z + b.z;
        return out;
    }

    /**
     * 向量减法
     * @param a 
     * @param b 
     * @param out 
     * @returns 
     */
    static subtract(a: Vector3, b: Vector3, out?: Vector3): Vector3 {
        if (out === undefined) {
            out = new Vector3();
        }
        out.x = a.x - b.x;
        out.y = a.y - b.y;
        out.z = a.z - b.z;
        return out;
    }

    /**
     * 向量与标量的乘法
     * @param k 
     * @param value 
     * @param out 
     * @returns 
     */
    static scale(k: number, value: Vector3, out?: Vector3): Vector3 {
        if (out === undefined) {
            out = new Vector3();
        }
        out.x = value.x * k;
        out.y = value.y * k;
        out.z = value.z * k;
        return out;
    }

    /**
     * 向量点乘dot(a,b)=|a||b|*cos(angle)
     * @param a 
     * @param b 
     * @returns 0 互相垂直 >0 向量夹角小于90度  <0 向量夹角大于90度 
     */
    static dot(a: Vector3, b: Vector3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    /**
     * 向量点积的绝对值
     * @param a 
     * @param b 
     * @returns 
     */
    static absDot(a: Vector3, b: Vector3): number {
        return Math.abs(this.dot(a, b));
    }

    /**
     * 求两个向量之间的夹角 cos(a,b)=dot(a,b)/|a||b|
     * @param a
     * @param b 
     */
    static angle(a: Vector3, b: Vector3): number {
        return Math.acos(Vector3.dot(a, b) / (a.length * b.length));
    }

    /**
     * 求两个单位向量之间的夹角 cos(a,b)=dot(a,b)/|a||b| 因为a,b 是单位向量，所以分母必为1，而任何数除1等于他本身。
     * @param a
     * @param b 
     */
    static angleFast(a: Vector3, b: Vector3): number {
        return Math.acos(Vector3.dot(a, b));
    }

    /**
     * 求A向量在B向量上的投影长度,
     * 假设C为A在B上的投影向量,
     * 那么|C|=|A|cos(A,B),而cos(A,B)=dot(A,B)/|A||B|,
     * 所以|C|=dot(A,B)/|B|,C=B的单位向量乘以|C|
     * @param a 
     * @param b 
     */
    static projection(a: Vector3, b: Vector3): number {
        let len: number = b.length;
        if (MathUtils.equals(len, 0)) {
            console.error("无法投影到零向量上！");
            return 0;
        }
        return this.dot(a, b) / b.length;
    }

    /**
     * 向量叉乘(求垂直于ab的向量)
     * @param a 
     * @param b 
     * @param out 
     */
    static cross(a: Vector3, b: Vector3, out?: Vector3): Vector3 {
        if (out === undefined) {
            out = new Vector3();
        }
        const ax: number = a.x;
        const ay: number = a.y;
        const az: number = a.z;

        const bx: number = b.x;
        const by: number = b.y;
        const bz: number = b.z;

        out.x = ay * bz - az * by;
        out.y = az * bx - ax * bz;
        out.z = ax * by - ay * bx;
        return out;
    }

    /**
     * 获取各分量中的最小值
     * @param a 
     * @param b 
     * @param result 
     * @returns 
     */
    static min(a: Vector3, b: Vector3, result?: Vector3): Vector3 {
        result = result || new Vector3();
        result.x = Math.min(a.x, b.x);
        result.y = Math.min(a.y, b.y);
        result.z = Math.min(a.z, b.z);
        return result;
    }

    /**
     * 获取各分量中的最大值
     * @param a 
     * @param b 
     * @param result 
     * @returns 
     */
    static max(a: Vector3, b: Vector3, result?: Vector3): Vector3 {
        result = result || new Vector3();
        result.x = Math.max(a.x, b.x);
        result.y = Math.max(a.y, b.y);
        result.z = Math.max(a.z, b.z);
        return result;
    }

    /**
     * 插值(1 - t) * start + t * end;
     * @param t         0-1
     * @param start 
     * @param end 
     * @param result 
     */
    static lerp(t:number,start:Vector3,end:Vector3,result?:Vector3):Vector3{
        result=result||new Vector3();
        let s1:Vector3=this.scale(1-t,start,this.tmp_Vec3_0);
        let e1:Vector3=this.scale(t,end,this.tmp_Vec3_1);
        this.add(s1,e1,result);
        return result;
    }
}