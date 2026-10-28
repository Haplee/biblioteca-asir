import sys
with open('scripts/verify-integrity.mjs','r',encoding='utf-8') as f:
    content = f.read()
with open('verify_integrity_head.txt','w',encoding='utf-8') as f:
    f.write(content[:2000])