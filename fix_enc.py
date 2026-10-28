import os
for root, dirs, files in os.walk('apuntes'):
    for f in files:
        if f.endswith('.md'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
                content = fh.read()
            new_content = content
            new_content = new_content.replace('��', '-')
            new_content = new_content.replace('�?', '?')
            new_content = new_content.replace('�?', 'í')
            new_content = new_content.replace('�?', 'ó')
            new_content = new_content.replace('�?', 'é')
            new_content = new_content.replace('�?', 'á')
            new_content = new_content.replace('�?', 'ú')
            new_content = new_content.replace('�', 'ñ')
            new_content = new_content.replace('ñ?', 'ñ')
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as fh:
                    fh.write(new_content)
                print('Fixed', path)
print('Done')
