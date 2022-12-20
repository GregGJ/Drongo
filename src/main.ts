import { Matrix4x4 } from "./drongo/core/transforms/Matrix4x4";
import { Vector3 } from "./drongo/core/transforms/Vector3";



function main(){
    console.log("main");

    let v:Vector3=new Vector3(0,100,0);
    let m:Matrix4x4=new Matrix4x4();
    m.translate(100,0,0);

    let out=new Vector3();
    Matrix4x4.multiplyVector3D(out,m,v);

    console.log(out);
}

main();
//当我们的 ​​tsconfig.json​​​ 中的 ​​isolatedModules​​​ 设置为 ​​true​​​ 时，如果某个 ​​ts​​​ 文件中没有一个
// ​​​import​​​ or ​​export​​​ 时，​​ts​​​ 则认为这个模块不是一个 ​​ES Module​​​ 模块，它被认为是一个全局的脚本，
// 这个时候在文件中添加任意一个 ​​​import or export​​ 都可以解决这个问题。
export {};