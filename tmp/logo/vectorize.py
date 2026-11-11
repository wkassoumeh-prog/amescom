from PIL import Image
from collections import deque, defaultdict
import math, statistics
from pathlib import Path
import xml.etree.ElementTree as ET

im = Image.open(r'C:\Users\wasim\OneDrive\Desktop\Amescom\WhatsApp Image 2026-11-11 at 11.03.18 AM.jpeg').convert('RGB')
w,h=im.size
p=im.load()
mask={(x,y) for y in range(h) for x in range(w) if max(p[x,y])-min(p[x,y])>35 and p[x,y][2]>p[x,y][0]+25 or sum(p[x,y])<490}
components=[]
while mask:
    seed=mask.pop(); comp={seed}; q=deque([seed])
    while q:
        x,y=q.popleft()
        for n in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
            if n in mask:
                mask.remove(n);comp.add(n);q.append(n)
    if len(comp)>5: components.append(comp)

def rdp(a,eps=.9):
    if len(a)<3:return a
    x,y=a[0];dx=a[-1][0]-x;dy=a[-1][1]-y
    den=math.hypot(dx,dy)
    ds=[abs(dy*(u-x)-dx*(v-y))/den if den else math.hypot(u-x,v-y) for u,v in a]
    i=max(range(len(ds)),key=ds.__getitem__)
    if ds[i]>eps:return rdp(a[:i+1],eps)[:-1]+rdp(a[i:],eps)
    return [a[0],a[-1]]

parts=[]
for comp in sorted(components,key=lambda c:min(x for x,y in c)):
    xs=[x for x,y in comp];ys=[y for x,y in comp]
    if max(xs)<170:
        n=len(comp);cx=sum(xs)/n+.5;cy=sum(ys)/n+.5
        xx=sum((x+.5-cx)**2 for x,y in comp)/n
        yy=sum((y+.5-cy)**2 for x,y in comp)/n
        xy=sum((x+.5-cx)*(y+.5-cy) for x,y in comp)/n
        gap=math.sqrt((xx-yy)**2+4*xy*xy)
        rx=2*math.sqrt((xx+yy+gap)/2);ry=2*math.sqrt((xx+yy-gap)/2)
        angle=math.degrees(.5*math.atan2(2*xy,xx-yy))
        blue=statistics.median(p[x,y][2]-p[x,y][0] for x,y in comp)>30
        fill='#347fb3' if blue else '#292929'
        parts.append(f'<ellipse cx="{cx:.2f}" cy="{cy:.2f}" rx="{rx:.2f}" ry="{ry:.2f}" transform="rotate({angle:.2f} {cx:.2f} {cy:.2f})" fill="{fill}"/>')
    else:
        edges=defaultdict(list)
        for x,y in comp:
            for neighbor,a,b in [((x,y-1),(x,y),(x+1,y)),((x+1,y),(x+1,y),(x+1,y+1)),((x,y+1),(x+1,y+1),(x,y+1)),((x-1,y),(x,y+1),(x,y))]:
                if neighbor not in comp:edges[a].append(b)
        loops=[]
        while edges:
            start=next(iter(edges));a=start;loop=[a]
            while True:
                b=edges[a].pop()
                if not edges[a]:del edges[a]
                loop.append(b);a=b
                if a==start:break
            k=len(loop)//2
            loop=rdp(loop[:k+1])[:-1]+rdp(loop[k:])[:-1]
            if len(loop)>2:loops.append('M'+' L'.join(f'{x},{y}' for x,y in loop)+' Z')
        parts.append('<path fill="#5b5c5c" fill-rule="evenodd" d="'+' '.join(loops)+'"/>')

out=Path('assets/amescom-logo.svg')
out.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w+20} {h+20}" width="{w+20}" height="{h+20}" role="img" aria-labelledby="title"><title id="title">AMeSCom</title><g transform="translate(10 10)">\n'+'\n'.join(parts)+'\n</g></svg>\n',encoding='utf-8')
root=ET.parse(out).getroot()
assert not any(el.tag.split('}')[-1] in ['image','script','foreignObject','text'] for el in root.iter())
print(f'Created {out}: {len(parts)} vector shapes, {out.stat().st_size} bytes; no embedded raster, scripts, or font dependencies.')

