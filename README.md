# oh-my-papers-website

This is one front-end completion of "Oh My Papers".

You can test the program locally through "PHPStudy". For example, you may create a local website with a domain name "www.ohmypapers.com" in "PHPStudy". Put all the files from this repo in your local path "/phpstudy/WWW/www.ohmypapers.com/".

In "/phpstudy/WWW/www.ohmypapers.com/", run the following command:

~~~bash
python3 back_end/src/test.py
~~~

Then type "www.ohmypapers.com" in your browser, and you will be able to use this application.

![img](img/test.png)

In the above example, the front-end sends a string "resnet" to the back-end.

And the front-end should receive a string from the back-end in the format as follows:

~~~
'[
    {
        "title": "Deep Residual Learning for Image Recognition",
        "author": "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
        "venue": "CVPR",
        "year": "2016",
        "abstract": "Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicityly reformulate the layers as learning residual function with ..."
    },
    
    {
        "title": "Inception-v4, Inception-ResNet and the Impact of Residual Connections on Learning",
        "author": "Christain Szegedy, S. loffe, V. Vanhoucke, Alexander Amir Alemi",
        "venue": "AAAI",
        "year": "2016",
        "abstract": "We study the combination of the tow most recent ideas: Residual connections introduced by He et al. in [5] and the latest revised version of the inception architecture."
    }
]'
~~~

What should be paid attention is that the back-end in this repo is just a simple test. Detailed information about the simple test is shown in "back_end/data/test.md".
