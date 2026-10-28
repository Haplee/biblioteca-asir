with open('v2.txt','r',encoding='utf-8',errors='replace') as f:
    for line in f:
        if 'FIDELIDAD' in line or 'Apuntes analizados' in line or 'No encontrados' in line or 'RESULTADO' in line:
            print(line.rstrip())
