# Front-End

You can test the program locally through "PHPStudy". For example, you may create a local website with a domain name "www.ohmypapers.com" in "PHPStudy". Put all the files from "front-end/" in your local path "/phpstudy/WWW/www.ohmypapers.com/".

In line 86 of "front-end/script.js", the websocket is set as 127.0.0.1:10086. It should corresponds to your back-end.

After connecting with back-end, type "www.ohmypapers.com" in your browser. Then you will be able to use this application.

## Function 1: Context Inference

When you type "resnet", the front-end will send a string to back-end in the format as follows:

~~~
'{
  "function": 1,
  "inference": [
    {
      "context": "resnet"
    }
  ]
}'
~~~

The front-end should receive a string from the back-end in the format as follows:

~~~
'{
  "function": 1,
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

## Function 2: Citation Inference

When you type in a string, the front-end will send a string to back-end in the format as follows:

~~~
'{
  "function": 2,
  "context": "Resnet [?] is a well-built neural network, which has been widely used in many deep learning fields. Yolo [?] is a famous object detection framework, who have reached the state-of-the-art in many fields. AlphaPose [?] is a pose estimation framework proposed by MVIG lab in Shanghai Jiao Tong University."
}'
~~~

The front-end should receive a string from the back-end in the format as follows:

~~~
'{
  "function": 2,
  "context": "Resnet [1] is a well-built neural network, which has been widely used in many deep learning fields. Yolo [2] is a famous object detection framework, who have reached the state-of-the-art in many fields. AlphaPose [3] is a pose estimation framework proposed by MVIG lab in Shanghai Jiao Tong University.", 
  "references": [
    {
      "title": "Deep residual learning for image recognition", 
      "abstract": "Deeper neural networks are more difficult to train...", 
      "venue": "CVPR", 
      "year": 2016, 
      "author": "K. He, X. Zhang, S. Ren, J. Sun", 
      "id": 65
    }, 
    {
      "title": "You only look once: Unified, real-time object detection", 
      "abstract": "We present YOLO, a new approach to object detection...", 
      "venue": "CVPR", 
      "year": 2016, 
      "author": "J. Redmon, S. Divvala, R. Girshick, A. Farhadi", 
      "id": 139
    }, 
    {
      "title": "Rmpe: Regional multi-person pose estimation", 
      "abstract": "Multi-person pose estimation in the wild is challenging...", 
      "venue": "ICCV", 
      "year": 2017, 
      "author": "H. Fang, S. Xie, Y.-W. Tai, C. Lu", 
      "id": 2496
    }
  ]
}'
~~~

## Function 2: Relation Inference

When you click "Related Papers", the front-end will send a string to back-end in the format as follows:

~~~
'{
  "function": 3,
  "id": 65
}'
~~~

The front-end should receive a string from the back-end in the format as follows:

~~~
{
  "function": 3,
  "result": [
    {
      "title": "Adversarial examples for semantic segmentation and object detection", 
      "abstract": "It has been well demonstrated that adversarial examples...", 
      "venue": "ICCV", 
      "author": "C. Xie, J. Wang, Z. Zhang, Y. Zhou, L. Xie, A. Yuille", 
      "year": 2017, 
      "id": 2844}, 
    {
      "title": "Batch normalization: Accelerating deep network training by reducing internal covariate shift", 
      "abstract": "Training Deep Neural Networks is complicated by the fact that the distributio...", 
      "venue": "ICML", 
      "author": "S. Ioffe, C. Szegedy", 
      "year": 2015, 
      "id": 267
    },
    ...
  ]
}'
~~~
