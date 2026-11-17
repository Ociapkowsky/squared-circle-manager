import sys,json,io
from PIL import Image,ImageFilter
import numpy as np
from scipy import ndimage as ndi
# usage: imp.py image key1,key2,... [cols]
img,keys=sys.argv[1],sys.argv[2].split(',');cols=int(sys.argv[3]) if len(sys.argv)>3 else 4
im=Image.open(img).convert('RGB');A=np.array(im).astype(float)
L=0.299*A[:,:,0]+0.587*A[:,:,1]+0.114*A[:,:,2]
dark=ndi.binary_closing(L<22,iterations=2);fill=ndi.binary_fill_holes(dark)
lab,n=ndi.label(fill)
objs=[(i+1,s) for i,s in enumerate(ndi.find_objects(lab)) if (lab[s]==i+1).sum()>8000]
assert len(objs)==len(keys),(len(objs),len(keys))
H=A.shape[0];rows=int(np.ceil(len(keys)/cols))
cy=lambda o:(o[1][0].start+o[1][0].stop)/2;cx=lambda o:(o[1][1].start+o[1][1].stop)/2
objs.sort(key=lambda o:(int(cy(o)//(H/rows)),cx(o)))
p='/home/claude/rb/plimg_data.js';t=open(p).read();head,body=t.split('const PLIMG=',1);ent=json.loads(body.rsplit(';',1)[0])
for key,(l,s) in zip(keys,objs):
    m=lab==l;a=np.array(Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8)))
    lo,hi=np.percentile(L[m],[3,97]);G=np.clip((L-lo)/(hi-lo),0,1)*255
    out=np.zeros(A.shape[:2]+(4,),dtype='uint8');out[:,:,0]=out[:,:,1]=out[:,:,2]=G.astype('uint8');out[:,:,3]=a
    ys,xs=np.where(m);out=out[ys.min():ys.max()+1,xs.min():xs.max()+1]
    fn=key.replace(':','_')+'.webp'
    Image.fromarray(out).save('/home/claude/plates/'+fn,'WEBP',quality=88,alpha_quality=100,method=6)
    ent[key]=[int(out.shape[1]),int(out.shape[0]),'plates/'+fn];print(key,out.shape[1],out.shape[0])
open(p,'w').write(head+'const PLIMG='+json.dumps(ent,separators=(',',':'))+';\n')
