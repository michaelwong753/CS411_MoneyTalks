# MoneyTalks
The project accomplished our goal of creating a visual tool that aggregates both data and information of over 50 different stocks. We accomplished our end goal of making a service, hosted on a website, that helps people make investment decisions based on past performance metrics, public perception, and meta information about many different stocks in the S&amp;P 500.

The daily stock data is stored in a MySQL database that we downloaded from running the python script located in the following Kaggle link . This link contains a script that scrapes daily stock performance metrics for almost every day for every stock in the NASDAQ. We also have a second table that stores the metadata for each stock. This table has a row for each stock and contains various high level information for each ticker, while the stock data table contains daily financial metrics such as the stock’s open, close, and volume (among others) for every trading day in the last 5 years. 
The data stored in our MongoDB database comes from the following Kaggle link.
This dataset contains information about 2.5 million /r/wallstreetbets comments which we trimmed thoroughly after removing comments that did not mention a ticker and also those that were more than 5 years of age. We used the date, number of upvotes (score) and the body of the comment itself for each comment when we display it on our website. We have a second table that stores which comment ID mentions which ticker along with the computed sentiment analysis. We created this table so our back-end server wouldn’t have to search through every comment everytime a search is made and so the server doesn’t have to analyze the comments each time as well. 


<h2>Check out our website at:</h2>

```
https://moneytalk.web.illinois.edu/
```

<h2>Some screenshot from the website:</h2>

![alt text](https://github.com/michaelwong753/MoneyTalks/blob/main/ex1.png)
![alt text](https://github.com/michaelwong753/MoneyTalks/blob/main/ex2.png)

