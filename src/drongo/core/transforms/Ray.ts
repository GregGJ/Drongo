import { Vector3 } from "./Vector3";



/**
 * 射线
 */
export default class Ray{

    /**
     * 起点
     */
    o:Vector3=null!;

    /**
     * 方向
     */
    d:Vector3=null!;
    
    constructor(o:Vector3,d:Vector3){
        this.o=o;
        this.d=d;
    }
}