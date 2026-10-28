import json
d=json.load(open('instituto_files.json', encoding='utf-8'))
for x in d:
    p=x['path']
    pl=p.lower()
    if '2024-2025\\bd\\' in pl and p.lower().endswith(('.txt','.sql')):
        print(p)
