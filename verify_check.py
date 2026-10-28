import subprocess
result = subprocess.run(['node','scripts/verify-integrity.mjs'], stdout=subprocess.PIPE)
output = result.stdout.decode('utf-8', errors='replace')
for line in output.split('\n'):
    if 'FIDELIDAD' in line or 'Apuntes analizados' in line or 'No encontrados' in line or 'RESULTADO' in line:
        print(line)
