import os
base=r'C:\Users\franc\Desktop\PC\Instituto\2024-2025\ASO\Tema 5\scripts'
for f in os.listdir(base):
    print(os.path.join(base,f))
    # try to read
    p=os.path.join(base,f)
    try:
        with open(p,'rb') as fh:
            data=fh.read()
        print(data[:80])
    except Exception as e:
        print(e)
    print()
