import MathUtils from "../../utils/MathUtils";
import { Vector3 } from "./Vector3";

/**
 * 4x4矩阵，先列后行
 */
export class Matrix4x4 {

    elements: Float32Array | Float64Array | Array<number>;

    constructor(
        m11: number = 1,
        m12: number = 0,
        m13: number = 0,
        m14: number = 0,

        m21: number = 0,
        m22: number = 1,
        m23: number = 0,
        m24: number = 0,

        m31: number = 0,
        m32: number = 0,
        m33: number = 1,
        m34: number = 0,

        m41: number = 0,
        m42: number = 0,
        m43: number = 0,
        m44: number = 1) {
        this.elements = new MathUtils.ArrayType(16);
        const e = this.elements;
        e[0] = m11;
        e[1] = m12;
        e[2] = m13;
        e[3] = m14;

        e[4] = m21;
        e[5] = m22;
        e[6] = m23;
        e[7] = m24;

        e[8] = m31;
        e[9] = m32;
        e[10] = m33;
        e[11] = m34;

        e[12] = m41;
        e[13] = m42;
        e[14] = m43;
        e[15] = m44;
    }

    /**
     * 设置值
     * @param m11 
     * @param m12 
     * @param m13 
     * @param m14 
     * @param m21 
     * @param m22 
     * @param m23 
     * @param m24 
     * @param m31 
     * @param m32 
     * @param m33 
     * @param m34 
     * @param m41 
     * @param m42 
     * @param m43 
     * @param m44 
     */
    setValue(
        m11: number,
        m12: number,
        m13: number,
        m14: number,

        m21: number,
        m22: number,
        m23: number,
        m24: number,

        m31: number,
        m32: number,
        m33: number,
        m34: number,

        m41: number,
        m42: number,
        m43: number,
        m44: number) {
        const e = this.elements;
        e[0] = m11;
        e[1] = m12;
        e[2] = m13;
        e[3] = m14;

        e[4] = m21;
        e[5] = m22;
        e[6] = m23;
        e[7] = m24;

        e[8] = m31;
        e[9] = m32;
        e[10] = m33;
        e[11] = m34;

        e[12] = m41;
        e[13] = m42;
        e[14] = m43;
        e[15] = m44;
    }

    /**
     * 通过数组设置值
     * @param value 
     * @param offset 
     */
    setValueByArray(value: ArrayLike<number>, offset: number = 0): void {
        const e = this.elements;
        for (let index = 0; index < 16; index++) {
            e[index] = value[index + offset];
        }
    }

    /**
     * 设置为单位向量
     * @returns 
     */
    identity(): Matrix4x4 {
        const e = this.elements;
        e[0] = 1;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;

        e[4] = 0;
        e[5] = 1;
        e[6] = 0;
        e[7] = 0;

        e[8] = 0;
        e[9] = 0;
        e[10] = 1;
        e[11] = 0;

        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;
        return this;
    }

    /**
     * 转换成字符串
     * @returns 
     */
    toString(): string {
        const e = this.elements;
        let r: string = "Matrix4x4:\n";
        r += e[0] + " , " + e[4] + " , " + e[8] + " , " + e[12] + "\n";
        r += e[1] + " , " + e[5] + " , " + e[9] + " , " + e[13] + "\n";
        r += e[2] + " , " + e[6] + " , " + e[10] + " , " + e[14] + "\n";
        r += e[3] + " , " + e[7] + " , " + e[11] + " , " + e[15];
        return r;
    }

    /**
     * 求矩阵的逆并填充到自身
     * @returns 
     */
    invert(): Matrix4x4 {
        Matrix4x4.invert(this, this);
        return this;
    }

    /**
     * 矩阵相乘并将结果填充到自身
     * @param right 
     * @returns 
     */
    multiply(right: Matrix4x4): Matrix4x4 {
        Matrix4x4.multiply(this, right, this);
        return this;
    }

    /**
     * 基于当前矩阵进行平移
     * @param v 
     */
    translate(x: number, y: number, z: number): Matrix4x4 {
        Matrix4x4.translate(this, this, x, y, z);
        return this;
    }

    /**
     * 克隆
     * @param out 
     * @returns 
     */
    clone(out?: Matrix4x4): Matrix4x4 {
        if (out === undefined) {
            out = new Matrix4x4();
        }
        const e = this.elements;
        out.setValue(
            e[0],
            e[1],
            e[2],
            e[3],
            e[4],
            e[5],
            e[6],
            e[7],
            e[8],
            e[9],
            e[10],
            e[11],
            e[12],
            e[13],
            e[14],
            e[15]
        )
        return out;
    }

    //=========================================static=================================//

    /**
     * 判断是否相等
     * @param a 
     * @param b 
     * @returns 
     */
    static equals(a: Matrix4x4, b: Matrix4x4): boolean {
        const ae = a.elements;
        const be = a.elements;
        return (
            MathUtils.equals(ae[0], be[0]) &&
            MathUtils.equals(ae[1], be[1]) &&
            MathUtils.equals(ae[2], be[2]) &&
            MathUtils.equals(ae[3], be[3]) &&
            MathUtils.equals(ae[4], be[4]) &&
            MathUtils.equals(ae[5], be[5]) &&
            MathUtils.equals(ae[6], be[6]) &&
            MathUtils.equals(ae[7], be[7]) &&
            MathUtils.equals(ae[8], be[8]) &&
            MathUtils.equals(ae[9], be[9]) &&
            MathUtils.equals(ae[10], be[10]) &&
            MathUtils.equals(ae[11], be[11]) &&
            MathUtils.equals(ae[12], be[12]) &&
            MathUtils.equals(ae[13], be[13]) &&
            MathUtils.equals(ae[14], be[14]) &&
            MathUtils.equals(ae[15], be[15])
        )
    }

    /**
     * 矩阵转置
     * @param a 
     * @param out 
     */
    static transpose(m: Matrix4x4, out: Matrix4x4): void {
        const me = m.elements;
        const oe = m.elements;
        if (m == out) {
            const a1 = me[1];
            const a2 = me[2];
            const a3 = me[3];
            const a6 = me[6];
            const a7 = me[7];
            const a11 = me[11];

            oe[1] = me[4];
            oe[2] = me[8];
            oe[3] = me[12];

            oe[4] = a1;
            oe[8] = a2;
            oe[12] = a3;

            oe[6] = me[9];
            oe[7] = me[13];

            oe[9] = a6;
            oe[13] = a7;

            oe[11] = me[14];
            oe[14] = a11;
        } else {
            oe[0] = me[0];
            oe[1] = me[4];
            oe[2] = me[8];
            oe[3] = me[12];

            oe[4] = me[1];
            oe[5] = me[5];
            oe[6] = me[9];
            oe[7] = me[13];

            oe[8] = me[2];
            oe[9] = me[6];
            oe[10] = me[10];
            oe[11] = me[14];

            oe[12] = me[3];
            oe[13] = me[7];
            oe[14] = me[11];
            oe[15] = me[15];
        }
    }

    /**
     * 矩阵乘法
     * @param left 
     * @param right 
     * @param out 
     */
    static multiply(left: Matrix4x4, right: Matrix4x4, out: Matrix4x4): void {
        const le = left.elements;
        const re = right.elements;
        const oe = out.elements;
        const l11 = le[0],
            l12 = le[1],
            l13 = le[2],
            l14 = le[3];
        const l21 = le[4],
            l22 = le[5],
            l23 = le[6],
            l24 = le[7];
        const l31 = le[8],
            l32 = le[9],
            l33 = le[10],
            l34 = le[11];
        const l41 = le[12],
            l42 = le[13],
            l43 = le[14],
            l44 = le[15];

        const r11 = re[0],
            r12 = re[1],
            r13 = re[2],
            r14 = re[3];
        const r21 = re[4],
            r22 = re[5],
            r23 = re[6],
            r24 = re[7];
        const r31 = re[8],
            r32 = re[9],
            r33 = re[10],
            r34 = re[11];
        const r41 = re[12],
            r42 = re[13],
            r43 = re[14],
            r44 = re[15];
        //第一列
        oe[0] = l11 * r11 + l21 * r12 + l31 * r13 + l41 * r14;
        oe[1] = l12 * r11 + l22 * r12 + l32 * r13 + l42 * r14;
        oe[2] = l13 * r11 + l23 * r12 + l33 * r13 + l43 * r14;
        oe[3] = l14 * r11 + l24 * r12 + l34 * r13 + l44 * r14;

        //第二列
        oe[4] = l11 * r21 + l21 * r22 + l31 * r23 + l41 * r24;
        oe[5] = l12 * r21 + l22 * r22 + l32 * r23 + l42 * r24;
        oe[6] = l13 * r21 + l23 * r22 + l33 * r23 + l43 * r24;
        oe[7] = l14 * r21 + l24 * r22 + l34 * r23 + l44 * r24;

        //第三列
        oe[8] = l11 * r31 + l21 * r32 + l31 * r33 + l41 * r34;
        oe[9] = l12 * r31 + l22 * r32 + l32 * r33 + l42 * r34;
        oe[10] = l13 * r31 + l23 * r32 + l33 * r33 + l43 * r34;
        oe[11] = l14 * r31 + l24 * r32 + l34 * r33 + l44 * r34;

        //第四列
        oe[12] = l11 * r41 + l21 * r42 + l31 * r43 + l41 * r44;
        oe[13] = l12 * r41 + l22 * r42 + l32 * r43 + l42 * r44;
        oe[14] = l13 * r41 + l23 * r42 + l33 * r43 + l43 * r44;
        oe[15] = l14 * r41 + l24 * r42 + l34 * r43 + l44 * r44;
    }

    /**
     * 矩阵与向量相乘 out=m*v
     * @param out 
     * @param m 
     * @param v
     */
    static multiplyVector3D(out: Vector3, m: Matrix4x4, v: Vector3, w: number = 1): void {
        const e = m.elements;
        const oe = out.elements;
        oe[0] = e[0] * v.x + e[4] * v.y + e[8] * v.z + e[12] * w;
        oe[1] = e[1] * v.x + e[5] * v.y + e[9] * v.z + e[13] * w;
        oe[2] = e[2] * v.x + e[6] * v.y + e[10] * v.z + e[14] * w;
    }

    /**
     * 给定矩阵添加平移操作
     * @param out 
     * @param m 
     * @param v 
     */
    static translate(out: Matrix4x4, m: Matrix4x4, x: number, y: number, z: number): void {
        let oe = out.elements;
        let me = out.elements;
        let a00: number, a01: number, a02: number, a03: number;
        let a10: number, a11: number, a12: number, a13: number;
        let a20: number, a21: number, a22: number, a23: number;

        if (m === out) {
            oe[12] = me[0] * x + me[4] * y + me[8] * z + me[12];
            oe[13] = me[1] * x + me[5] * y + me[9] * z + me[13];
            oe[14] = me[2] * x + me[6] * y + me[10] * z + me[14];
            oe[15] = me[3] * x + me[7] * y + me[11] * z + me[15];
        } else {
            a00 = me[0];
            a01 = me[1];
            a02 = me[2];
            a03 = me[3];
            a10 = me[4];
            a11 = me[5];
            a12 = me[6];
            a13 = me[7];
            a20 = me[8];
            a21 = me[9];
            a22 = me[10];
            a23 = me[11];

            oe[0] = a00;
            oe[1] = a01;
            oe[2] = a02;
            oe[3] = a03;
            oe[4] = a10;
            oe[5] = a11;
            oe[6] = a12;
            oe[7] = a13;
            oe[8] = a20;
            oe[9] = a21;
            oe[10] = a22;
            oe[11] = a23;

            oe[12] = a00 * x + a10 * y + a20 * z + me[12];
            oe[13] = a01 * x + a11 * y + a21 * z + me[13];
            oe[14] = a02 * x + a12 * y + a22 * z + me[14];
            oe[15] = a03 * x + a13 * y + a23 * z + me[15];
        }
    }

    /**
     * 矩阵的逆
     * @param a 
     * @param out 
     * @returns 
     */
    static invert(a: Matrix4x4, out: Matrix4x4): void {
        const ae = a.elements;
        const oe = out.elements;

        const m00 = ae[0], m01 = ae[1], m02 = ae[2],
            m10 = ae[4], m11 = ae[5], m12 = ae[6],
            m20 = ae[8], m21 = ae[9], m22 = ae[10],
            m30 = ae[12], m31 = ae[13], m32 = ae[14];

        //用于减少计算次数
        const c1: number = m11 * m22 - m12 * m21;
        const c2: number = m10 * m22 - m12 * m20;
        const c3: number = m10 * m21 - m11 * m20;

        //行列式
        let det: number = m00 * (c1) - m01 * (c2) + m02 * (c3);

        if (Math.abs(det) < MathUtils.zeroTolerance) {
            throw new Error("矩阵不可逆！");
        }

        const det_inv: number = 1 / det;
        //A的逆=(1/|A|))*adj(A);
        oe[0] = det_inv * (c1);
        oe[1] = -det_inv * (m01 * m22 - m02 * m21);
        oe[2] = det_inv * (m01 * m12 - m02 * m11);
        oe[3] = 0;

        oe[4] = -det_inv * (c2);
        oe[5] = det_inv * (m00 * m22 - m02 * m20);
        oe[6] = -det_inv * (m00 * m12 - m02 * m10);
        oe[7] = 0;

        oe[8] = det_inv * (c3);
        oe[9] = -det_inv * (m00 * m21 - m01 * m20);
        oe[10] = det_inv * (m00 * m11 - m01 * m10);
        oe[11] = 0;

        //由于A*A-1=I
        //A已知 A-1中3X3部分已经计算得出 第四行为0,0,0,1
        oe[12] = -(m30 * oe[0] + m31 * oe[4] + m32 * oe[8]);
        oe[13] = -(m30 * oe[1] + m31 * oe[5] + m32 * oe[9]);
        oe[14] = -(m30 * oe[2] + m31 * oe[6] + m32 * oe[10]);
        oe[15] = 1;
    }

    /**
     * 创建一个平移矩阵
     * @param translation
     * @param out
     */
    static makeTranslation(translation: Vector3, out: Matrix4x4): void {
        const oe = out.elements;
        oe[0] = 1;
        oe[1] = 0;
        oe[2] = 0;
        oe[3] = 0;

        oe[4] = 0;
        oe[5] = 1;
        oe[6] = 0;
        oe[7] = 0;

        oe[8] = 0;
        oe[9] = 0;
        oe[10] = 1;
        oe[11] = 0;

        oe[12] = translation.x;
        oe[13] = translation.y;
        oe[14] = translation.z;
        oe[15] = 1;
    }
}