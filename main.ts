const fs=require("fs");
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
function run(P,D){
 const S=new Int32Array(256),M=new Int32Array(256),C=new Int32Array(64);
 let p=0,c=0,pc=0,st=0,di=0;const o=[];
 for(;;){
  if(st>=1e6)return[10,o];
  if(pc<0||pc>=P.length)return[9,o];
  const op=P[pc];st++;let a,b;
  switch(op){
   case 0:return[0,o];
   case 1:if(pc+1>=P.length)return[9,o];if(p>=256)return[3,o];S[p++]=(P[pc+1]<<24)>>24;pc+=2;break;
   case 2:if(pc+4>=P.length)return[9,o];if(p>=256)return[3,o];S[p++]=P[pc+1]|P[pc+2]<<8|P[pc+3]<<16|P[pc+4]<<24;pc+=5;break;
   case 3:if(p<1)return[2,o];p--;pc++;break;
   case 4:if(p<1)return[2,o];if(p>=256)return[3,o];S[p]=S[p-1];p++;pc++;break;
   case 5:if(p<2)return[2,o];a=S[p-1];S[p-1]=S[p-2];S[p-2]=a;pc++;break;
   case 6:if(p<2)return[2,o];if(p>=256)return[3,o];S[p]=S[p-2];p++;pc++;break;
   case 7:if(p<3)return[2,o];a=S[p-3];S[p-3]=S[p-2];S[p-2]=S[p-1];S[p-1]=a;pc++;break;
   case 16:if(p<2)return[2,o];S[p-2]=S[p-2]+S[p-1]|0;p--;pc++;break;
   case 17:if(p<2)return[2,o];S[p-2]=S[p-2]-S[p-1]|0;p--;pc++;break;
   case 18:if(p<2)return[2,o];S[p-2]=Math.imul(S[p-2],S[p-1]);p--;pc++;break;
   case 19:if(p<2)return[2,o];a=S[p-2];b=S[p-1];if(!b)return[4,o];S[p-2]=Math.trunc(a/b)|0;p--;pc++;break;
   case 20:if(p<2)return[2,o];a=S[p-2];b=S[p-1];if(!b)return[4,o];S[p-2]=a%b|0;p--;pc++;break;
   case 21:if(p<2)return[2,o];a=S[p-2]>>>0;b=S[p-1]>>>0;if(!b)return[4,o];S[p-2]=Math.floor(a/b)|0;p--;pc++;break;
   case 22:if(p<2)return[2,o];a=S[p-2]>>>0;b=S[p-1]>>>0;if(!b)return[4,o];S[p-2]=a%b|0;p--;pc++;break;
   case 23:if(p<1)return[2,o];S[p-1]=-S[p-1]|0;pc++;break;
   case 24:if(p<2)return[2,o];S[p-2]&=S[p-1];p--;pc++;break;
   case 25:if(p<2)return[2,o];S[p-2]|=S[p-1];p--;pc++;break;
   case 26:if(p<2)return[2,o];S[p-2]^=S[p-1];p--;pc++;break;
   case 27:if(p<1)return[2,o];S[p-1]=~S[p-1];pc++;break;
   case 28:if(p<2)return[2,o];S[p-2]<<=S[p-1];p--;pc++;break;
   case 29:if(p<2)return[2,o];S[p-2]>>=S[p-1];p--;pc++;break;
   case 30:if(p<2)return[2,o];S[p-2]=S[p-2]>>>S[p-1]|0;p--;pc++;break;
   case 32:if(p<2)return[2,o];S[p-2]=S[p-2]===S[p-1]?1:0;p--;pc++;break;
   case 33:if(p<2)return[2,o];S[p-2]=S[p-2]<S[p-1]?1:0;p--;pc++;break;
   case 34:if(p<2)return[2,o];S[p-2]=(S[p-2]>>>0)<(S[p-1]>>>0)?1:0;p--;pc++;break;
   case 48:if(pc+2>=P.length)return[9,o];a=(P[pc+1]|P[pc+2]<<8)<<16>>16;pc+=3+a;break;
   case 49:if(pc+2>=P.length)return[9,o];if(p<1)return[2,o];a=(P[pc+1]|P[pc+2]<<8)<<16>>16;b=pc+3+a;pc=S[--p]===0?b:pc+3;break;
   case 50:if(pc+2>=P.length)return[9,o];if(p<1)return[2,o];a=(P[pc+1]|P[pc+2]<<8)<<16>>16;b=pc+3+a;pc=S[--p]!==0?b:pc+3;break;
   case 51:if(pc+2>=P.length)return[9,o];if(c>=64)return[7,o];C[c++]=pc+3;pc=P[pc+1]|P[pc+2]<<8;break;
   case 52:if(!c)return[8,o];pc=C[--c];break;
   case 64:if(p<1)return[2,o];a=S[p-1];if(a<0||a>255)return[6,o];S[p-1]=M[a];pc++;break;
   case 65:if(p<2)return[2,o];a=S[p-1];b=S[p-2];if(a<0||a>255)return[6,o];M[a]=b;p-=2;pc++;break;
   case 80:if(p<1)return[2,o];a=S[--p];b=String(a);if(o.length+b.length>65536)return[11,o];o.push(...Buffer.from(b));pc++;break;
   case 81:if(p<1)return[2,o];if(o.length>=65536)return[11,o];o.push(S[--p]&255);pc++;break;
   case 82:if(p>=256)return[3,o];S[p++]=di<D.length?D[di++]:-1;pc++;break;
   case 83:if(p<1)return[2,o];return[S[--p]&255,o];
   default:return[5,o];
  }
 }
}
for(let n=1;n<=40;n++){
 const id="i"+String(n).padStart(3,"0");let e=0,o=[];
 try{const P=fs.readFileSync(I+"/"+id+"/program.bin"),D=fs.readFileSync(I+"/"+id+"/input.bin");[e,o]=run(P,D);}catch(_){e=0;o=[];}
 fs.mkdirSync(O+"/"+id,{recursive:true});
 fs.writeFileSync(O+"/"+id+"/stdout.bin",Buffer.from(o));
 fs.writeFileSync(O+"/"+id+"/exit.txt",String(e));
}
