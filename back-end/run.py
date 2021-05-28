import asyncio
import websockets
import json
import os
from inference_bert import BertInferencer
import yaml

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
    input = json.loads(input)
    output = inferencer.inference(input)
    output = json.dumps(output)
    return output


if __name__ == '__main__':
    with open('configs/bert.yaml', 'r') as cfg_file:
        cfgs = yaml.load(cfg_file, Loader=yaml.FullLoader)
    inferencer = BertInferencer(**cfgs)
    
    print("127.0.0.1:10086 websocket...")

    asyncio.get_event_loop().run_until_complete(websockets.serve(run, "127.0.0.1", 10086))
    asyncio.get_event_loop().run_forever()
