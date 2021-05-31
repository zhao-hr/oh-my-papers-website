# Back-End

In this repo, "back-end/run.py" will be used to communicate with the front-end and call the inference function. The implementation of inference can be downloaded from [oh-my-paper](shttps://github.com/Galaxies99/oh-my-papers). Put the downloaded files in "back-end/". Run the following command to start the back-end.

~~~bash
python3 run.py
~~~

In line 59 of "back-end/run.py", the websocket is set as "127.0.0.1:10086". It should corresponds to the front-end.
