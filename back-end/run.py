import asyncio
import websockets
import json
import os
import time
from inference import Inferencer
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
    if input["function"] == 1:
        input.pop("function", 0)
        output = inferencer.context_inference(input)
        output["function"] = 1
    elif input["function"] == 2:
        input.pop("function", 0)
        output = inferencer.citation_inference(input)
        output["function"] = 2
    else:
        input.pop("function", 0)
        output = inferencer.relation_inference(input)
        output["function"] = 3
    #time.sleep(0.01)
    output = json.dumps(output)
    with open('data/bert_res.json','w+') as f:
        f.write(output)
    return output


if __name__ == '__main__':
    with open('configs/citation_bert.yaml', 'r') as cfg_file:
        engine_cfg = yaml.load(cfg_file, Loader=yaml.FullLoader)
    with open('configs/vgae.yaml', 'r') as cfg_file:
        relation_engine_cfg = yaml.load(cfg_file, Loader = yaml.FullLoader)

    inferencer = Inferencer(engine_cfg, relation_engine_cfg, engine = "citation_bert", relation_engine = "VGAE")
    
    print("127.0.0.1:10086 websocket...")

    asyncio.get_event_loop().run_until_complete(websockets.serve(run, "127.0.0.1", 10086))
    asyncio.get_event_loop().run_forever()
