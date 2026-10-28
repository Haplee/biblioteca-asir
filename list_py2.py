import json
d=json.load(open('instituto_files.json', encoding='utf-8'))
for x in d:
    p=x['path']
    if 'python-instituto' in p.lower() and p.lower().endswith('.py'):
        print(p)
