import os
import sys
import json
from pathlib import Path

root = Path(r'C:\Users\franc\Desktop\PC\Instituto')
out = []
for dirpath, dirnames, filenames in os.walk(root):
    for fn in filenames:
        ext = os.path.splitext(fn)[1].lower()
        if ext in ['.txt', '.md', '.py', '.sh', '.sql', '.pdf', '.ps1', '.bat', '.cfg', '.json', '.xml', '.html', '.csv']:
            p = os.path.join(dirpath, fn)
            try:
                stat = os.stat(p)
                out.append({
                    'path': p,
                    'name': fn,
                    'ext': ext,
                    'size': stat.st_size,
                    'mtime': stat.st_mtime
                })
            except Exception as e:
                out.append({'path': p, 'name': fn, 'ext': ext, 'error': str(e)})

out_sorted = sorted(out, key=lambda x: x['path'])
with open(r'C:\Users\franc\proyectos\Personal\biblioteca-asir\instituto_files.json', 'w', encoding='utf-8') as f:
    json.dump(out_sorted, f, ensure_ascii=False, indent=2)

print(f'Found {len(out_sorted)} files')
for o in out_sorted[:80]:
    print(o['path'])
