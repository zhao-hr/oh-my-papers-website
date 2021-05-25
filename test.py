import asyncio
import websockets

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
        return "Deep Residual Learning for Image Recognition"
    else:
        return "Other Papers"


if __name__ == '__main__':
    print("127.0.0.1:10086 websocket...")

    asyncio.get_event_loop().run_until_complete(websockets.serve(run, "127.0.0.1", 10086))
    asyncio.get_event_loop().run_forever()
