# BigDataFinalProject

<br />
<br />

In this project we designed a system that receives a stream of messages, <br />
stores and processes them in templates. <br />
We used accepted data infrastructures for their analysis. <br />


The system enables the management of toll road sections <br />
At any given moment you can know how many cars are in each section. <br />
Cars enter and exit the segment on a regular basis, <br />
the simulator generates these events and drags updates. <br />
The system displays on a dashboard the current number of cars and allows you to request the details of the cars. <br />
The system builds a prediction model based on a decision tree: <br />
giving details of the road entrance section, type of car, day of the week and time
Prediction is made from which section the car will exit. <br />
And shows in percent how right we were in our prediction <br />
  
![צילום מסך 2021-07-14 100948](https://user-images.githubusercontent.com/57682267/125578886-bfda8a7b-1ac1-432f-9d63-ad0027d3da41.png)
<br />
<br />

The system uses two NoSQL databases: <br />
MongoDB & Redis <br />
One will store processed data for long-term historical uses, <br />
And the other will keep a small amount of information data for fast queries. <br />

Diagram showing technological mapping of the system: <br />
<br />
<br />

![צילום מסך 2021-07-14 095857](https://user-images.githubusercontent.com/57682267/125577570-038ddd68-b64a-473e-9ec0-75423965bf4b.png)


* In order to run the system: <br />
----- Open three terminals-  <br />
1) Run- node ./kafka/kafkaConsume.js  <br />
2) Run- node ./simulator.js  <br />
3) Run- node ./app.js  <br />
 <br />
 
 

----- Open Docker and run it by typing port 3679 for the code to work.  <br /> <br /> <br />
![1](https://user-images.githubusercontent.com/57682267/128641594-db927827-485e-4e56-aa5a-0e20061f8dbb.jpeg)
* (You can see how many cars are on the road by typing the command redis-cli and then KEYS *)   <br />  <br />
![2](https://user-images.githubusercontent.com/57682267/128641593-c6254a62-c9d2-4438-a126-123931a84da2.jpeg)
 <br />
 
* By typing localhost: 3000 / dashboard you will get the number of cars on the road at the given moment: <br />
<br /> <br />  
![3](https://user-images.githubusercontent.com/57682267/128641818-9513593d-a879-4607-aae2-b5343e2d46ac.jpeg)
<br />

* By typing localhost: 3000 / p you will get the prediction table and how much machine learning was correct.<br />
 You can click the "Learn again" button to re-learn.
<br /> <br /> 
![4](https://user-images.githubusercontent.com/57682267/128641754-ddd23d40-ef48-4a45-b645-e2953f73e306.jpeg)

 <br />
