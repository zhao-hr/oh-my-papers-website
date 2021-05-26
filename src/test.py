import asyncio
import websockets
import json

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
    if input == "resnet":
        with open('data/resnet.json', 'r') as f:
            obj = json.load(f)
        obj = json.dumps(obj)
        print(obj)
        return obj
    else:
        with open('data/ohmypaper.json', 'r') as f:
            obj = json.load(f)
        obj = json.dumps(obj)
        print(obj)
        return obj


if __name__ == '__main__':
    print("127.0.0.1:10086 websocket...")

    asyncio.get_event_loop().run_until_complete(websockets.serve(run, "127.0.0.1", 10086))
    asyncio.get_event_loop().run_forever()
