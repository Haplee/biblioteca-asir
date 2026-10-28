with open('verify_final.txt','rb') as f:
    data = f.read()
s = data.decode('cp1252', errors='replace')
for line in s.split('\n'):
    if 'FIDELIDAD' in line or 'Apuntes analizados' in line or 'No encontrados' in line or 'RESULTADO' in line:
        print(line)
