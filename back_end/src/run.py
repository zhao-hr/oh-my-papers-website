import asyncio
import websockets
import json
import os
import time

input = ""

async def recv_user_msg(websocket):
    while True:
        input = await websocket.recv()
        print("Receive \"", input, "\" from Client")
        output = recommendation(input)
        await websocket.send(output)
        print("Sent \"", output, "\" to Client")

async def run(websocket, path):
    while True:
        try:
            await recv_user_msg(websocket)
        except websockets.ConnectionClosed:
            print("ConnectionClosed...", path)
            break


def recommendation(input):
    path = os.getcwd()
    print(path)
    
    with open(path + '/back_end/data/bert.json', 'w+') as f:
        f.write(input)
    
    os.popen('python3 ' + path + '/back_end/src/command_inference_bert.py --input bert.json --output bert_res.json')
    
    time.sleep(0.1)

    obj_string = ""
    with open(path + '/back_end/data/bert_res.json', 'r') as f:
        obj = json.load(f)
        obj_string = json.dumps(obj)
    return obj_string


if __name__ == '__main__':
    print("127.0.0.1:10086 websocket...")

    asyncio.get_event_loop().run_until_complete(websockets.serve(run, "127.0.0.1", 10086))
    asyncio.get_event_loop().run_forever()