import os
base=r'C:\Users\franc\Desktop\PC\Instituto\2024-2025\IMAW\Tema 5'
for root,dirs,files in os.walk(base):
    for f in files:
        if f.lower().endswith(('.txt','.md')):
            p=os.path.join(root,f)
            print(p)
            try:
                with open(p, encoding='utf-8', errors='ignore') as fh:
                    print(repr(fh.read()[:150]))
            except Exception as e:
                print(e)
            print('---')
