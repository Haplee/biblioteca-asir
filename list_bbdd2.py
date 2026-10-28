import json
d=json.load(open('instituto_files.json', encoding='utf-8'))
for x in d:
    p=x['path']
    pl=p.lower()
    # exclude sqldeveloper/tools
    if '2024-2025\\bd\\' in pl and p.lower().endswith(('.txt','.sql')):
        if 'sqldeveloper' in pl or 'oracle' in pl and p.lower().endswith('.txt'):  # but be careful
            pass
# better filter
for x in d:
    p=x['path']
    pl=p.lower()
    if pl.startswith(r'c:\users\franc\desktop\pc\instituto\2024-2025\bd\\'):
        if 'sqldeveloper' in pl:
            continue
        if p.lower().endswith(('.txt','.sql')):
            print(p)
