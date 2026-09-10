import json
with open('C:/Users/sriram/.gemini/antigravity-ide/brain/f0fa8c12-4b3a-4af3-a67b-26ceeb5ae405/.system_generated/logs/transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in reversed(f.readlines()):
        if 'USER_INPUT' in line:
            data = json.loads(line)
            print('Keys in data:', list(data.keys()))
            if 'media' in data:
                print('Media:', data['media'])
            if 'attachments' in data:
                print('Attachments:', data['attachments'])
            break
