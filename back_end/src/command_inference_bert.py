import sys
import json

args = sys.argv[:]

input = ""
with open('back_end/data/' + args[2], 'r') as f:
    obj = json.load(f)
    input = obj['inference'][0]['context']

obj_string = ""
if input == 'resnet':
    with open('back_end/data/resnet.json', 'r') as f:
        obj = json.load(f)
        obj_string = json.dumps(obj)
else:
    with open('back_end/data/ohmypaper.json', 'r') as f:
        obj = json.load(f)
        obj_string = json.dumps(obj)

with open('back_end/data/' + args[4], 'w+') as f:
    f.write(obj_string)