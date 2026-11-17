import sys,json,io
from PIL import Image,ImageFilter
import numpy as np
from scipy import ndimage as ndi
# usage: imp.py image key1,key2,... [cols]
img,keys=sys.argv[1],sys.argv[2].split(',');cols=int(sys.argv[3]) if len(sys.argv)>3 else 4
raw=Image.open(img);HASA=raw.mode=='RGBA' and np.array(raw)[:,:,3].min()<10
im=raw.convert('RGB');A=np.array(im).astype(float)
AL=np.array(raw)[:,:,3] if HASA else None
L=0.299*A[:,:,0]+0.587*A[:,:,1]+0.114*A[:,:,2]
import os
THV=float(os.environ.get('TH','22'))
src=(L>THV) if os.environ.get('BLACKBG') else ((AL>40) if HASA else (L<THV))
dark=ndi.binary_closing(src,iterations=int(os.environ.get('IT','2')));fill=ndi.binary_fill_holes(dark)
lab,n=ndi.label(fill)
objs=[(i+1,s) for i,s in enumerate(ndi.find_objects(lab)) if (lab[s]==i+1).sum()>8000]
assert len(objs)==len(keys),(len(objs),len(keys))
H=A.shape[0];rows=int(np.ceil(len(keys)/cols))
cy=lambda o:(o[1][0].start+o[1][0].stop)/2;cx=lambda o:(o[1][1].start+o[1][1].stop)/2
objs.sort(key=lambda o:(int(cy(o)//(H/rows)),cx(o)))
p='/home/claude/rb/plimg_data.js';t=open(p).read();head,body=t.split('const PLIMG=',1);ent=json.loads(body.rsplit(';',1)[0])
for key,(l,s) in zip(keys,objs):
    if __import__('os').environ.get('ONLY') and key not in __import__('os').environ['ONLY'].split(','): continue
    m=lab==l
    if __import__('os').environ.get('BGCLEAN'):
        er=ndi.binary_erosion(m,iterations=14);band=m&~er&(L>175)
        cl,cn=ndi.label(band);edge=ndi.binary_dilation(~m,iterations=2)
        rem=np.zeros_like(m)
        for j in range(1,cn+1):
            cj=cl==j
            if (cj&edge).any(): rem|=cj
        m=m&~rem;m=ndi.binary_opening(m,iterations=int(__import__('os').environ.get('OP','1')));ll,nn=ndi.label(m);sz=ndi.sum(m,ll,range(1,nn+1));m=ll==(1+int(np.argmax(sz)))
    if __import__('os').environ.get('FILLTOP'):
        ys0,xs0=np.where(m);y0,y1,x0,x1=ys0.min(),ys0.max(),xs0.min(),xs0.max()
        mc=ndi.binary_fill_holes(ndi.binary_closing(m,iterations=18));r=mc&~m
        box=np.zeros_like(m);box[y0:int(y0+(y1-y0)*.4),int(x0+(x1-x0)*.28):int(x0+(x1-x0)*.72)]=True
        r&=box;L=np.where(r,70.0,L);m=m|r
    ring=m&~ndi.binary_erosion(m,iterations=2)
    if True: L=np.where(ring,np.minimum(L,18),L)
    a=np.array(Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8)))
    lo,hi=np.percentile(L[m],[3,97]);G=np.clip((L-lo)/(hi-lo),0,1)*255
    out=np.zeros(A.shape[:2]+(4,),dtype='uint8');out[:,:,0]=out[:,:,1]=out[:,:,2]=G.astype('uint8');out[:,:,3]=a
    ys,xs=np.where(m);out=out[ys.min():ys.max()+1,xs.min():xs.max()+1]
    fn=key.replace(':','_')+'.webp'
    Image.fromarray(out).save('/home/claude/plates/'+fn,'WEBP',quality=88,alpha_quality=100,method=6)
    ent[key]=[int(out.shape[1]),int(out.shape[0]),'plates/'+fn];print(key,out.shape[1],out.shape[0])
open(p,'w').write(head+'const PLIMG='+json.dumps(ent,separators=(',',':'))+';\n')
