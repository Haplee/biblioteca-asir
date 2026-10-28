import json, os
d = json.load(open('instituto_files.json', encoding='utf-8'))
relevant = []
for x in d:
    p = x['path']
    pl = p.lower()
    if '2024-2025' not in pl: continue
    if 'sqldeveloper' in pl or 'oracle.jdeveloper' in pl: continue
    if p.lower().endswith(('.txt','.md','.py','.sh','.sql','.ps1','.bat')):
        relevant.append(p)

groups = {}
for p in relevant:
    pl = p.lower()
    if '\\python-instituto\\' in pl and p.lower().endswith('.py'):
        k = 'PYTHON'
    elif '\\bd\\' in pl:
        k = 'BD'
    elif '\\aso\\' in pl:
        k = 'ASO'
    elif '\\iaw\\' in pl or '\\imaw\\' in pl:
        k = 'IAW'
    elif 'manual de git' in pl:
        k = 'GIT'
    elif 'eie' in pl or 'emprend' in pl:
        k = 'EIE'
    elif 'powershell' in pl and 'actividades' in pl:
        k = 'POWERSHELL'
    else:
        k = 'OTHER'
    if k not in groups: groups[k] = []
    groups[k].append(p)

for k,v in sorted(groups.items()):
    print(f'=== {k}: {len(v)} files ===')
    for p in sorted(set(v)):
        print(f'  {os.path.basename(p)}')
    print()
