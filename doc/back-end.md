# oh-my-papers-website

This is a front-end completion of "Oh My Papers".

You can test the program locally through "PHPStudy". For example, you may create a local website with a domain name "www.ohmypapers.com" in "PHPStudy". Put all the files from "front-end/" in your local path "/phpstudy/WWW/www.ohmypapers.com/".

Enter "back-end/". Download files from [oh-my-paper](shttps://github.com/Galaxies99/oh-my-papers) and put them in "back-end/". After training, run the following command:

~~~bash
python3 run.py
~~~

Then type "www.ohmypapers.com" in your browser, and you will be able to use this application.

![img](front-end/img/test.png)

In the above example, the front-end sends a string to the back-end in the format as follows:

~~~
'{
  "inference": [
    {
      "context": "resnet"
    }
  ]
}'
~~~

And the front-end should receive a string from the back-end in the format as follows:

~~~
'{
  "inference": [
    {
      "result": [
        {
          "title": "Deep residual learning for image recognition", 
          "abstract": "Deeper neural networks are more difficult to train...", 
          "venue": "CVPR", 
          "year": 2016, 
          "author": "K. He, X. Zhang, S. Ren, J. Sun"
        },
        {
          "title": "Going deeper with convolutions", 
          "abstract": "We propose a deep convolutional neural network architecture...", 
          "venue": "CVPR", 
          "year": 2015, 
          "author": "C. Szegedy, W. Liu, Y. Jia, P. Sermanet, ..."
        }
        ......
      ]
    }
  ]
}'
~~~
