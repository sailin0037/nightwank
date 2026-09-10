import json
with open('C:/Users/sriram/.gemini/antigravity-ide/brain/f0fa8c12-4b3a-4af3-a67b-26ceeb5ae405/.system_generated/logs/transcript_full.jsonl', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for line in reversed(lines):
        if 'USER_INPUT' in line:
            print('Found user input')
            data = json.loads(line)
            if 'attachments' in data:
                print('Attachments found:', len(data['attachments']))
                for i, att in enumerate(data['attachments']):
                    if 'url' in att:
                        print(f'Attachment {i} URL: {att["url"]}')
            if 'parts' in data:
                 print('Parts found:', len(data['parts']))
                 for i, p in enumerate(data['parts']):
                     if 'inlineData' in p or 'fileData' in p or 'image' in p:
                         print(f'Media part {i} exists')
            break
