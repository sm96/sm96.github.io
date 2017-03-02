setwd('/Users/Sanchya/Documents/INFO370/a4-project-eda-sm96')
library(dplyr)
library(stringr)
library(ggplot2)

#Reading in the data, create new variables
country_df <- read.csv(file="data.csv",head=TRUE,sep=",") 
unemp_df <- read.csv(file = "unemployment.csv", head = TRUE, sep = ",") 
india_df <- read.csv(file = "indianrupee.csv", head = TRUE, sep = ",")
canada_df <- read.csv(file = "canadiandollar.csv", head = TRUE, sep = ",")

avg_unemployment <- rowMeans(unemp_df[2:13], dims = "1") #avg unemployment rate per year
dframe <- data.frame(unemp_df, "Average"= avg_unemployment)

avgbyyear_ind <- rowMeans(india_df[2:13], dims = "1") #avg by year India
india_dframe <- data.frame(india_df, "YearAverage"= avgbyyear_ind)

avgbyyear_can <- rowMeans(canada_df[2:13], dims = "1") #average by year Canada
can_dframe <- data.frame(canada_df, "YearAverage"= avgbyyear_can)


#dimensions of each dataset
dim(country_df)
dim(unemp_df)
dim(india_df)
dim(canada_df)

#column names
names(country_df)
names(unemp_df)

#summary stats for both
str(country_df)
summary(country_df$India)
summary(country_df$Canada)
summary(unemp_df)

#Heads and tails of data
head(country_df, n = 5)
head(unemp_df, n = 5)
tail(country_df, n = 5)
tail(unemp_df, n = 5)

#graphs

#all the points
a = qplot(x=X, y=India, data=country_df, geom = "point")
b = qplot(x=X, y=Canada, data = country_df, geom = "point")

#countries by yearly averages
ind_avg <- qplot(x=Year, y=YearAverage, data=india_dframe, geom = "point")
can_avg <- qplot(x=Year, y=YearAverage, data=can_dframe, geom = "point")

#unemployment by year graph
unemp <- ggplot()+ geom_point(data=india_dframe, aes(dframe$Year,dframe$Average), color = "red")

#averages across countries
countryavgs <- dplyr::summarize_each(country_df[2:9], funs(mean))
countryavg_df <-tidyr::gather(countryavgs)
countryavg_df <- setNames(countryavg_df, c("Country", "Average"))
c  = qplot(x=Country, y=Average, data = countryavg_df, geom = "point")

#both against each other
vectora <- india_dframe$Year
vectorb <- india_dframe$YearAverage

vectoraa <- dframe$Year
vectorbb <- dframe$Average

#red is India Currency Rate, yellow is Unemployment Rate
d <- ggplot() +
  geom_point(data=india_dframe, aes(vectora,vectorb), color = "red") +
  geom_point(data = dframe, aes(vectoraa, vectorbb), color = "yellow")
d
#blue is Canada Currency Rate, yellow is Unemployment Rate
e <- ggplot() +
  geom_point(data=can_dframe, aes(can_dframe$Year,can_dframe$YearAverage), color = "blue") +
  geom_point(data = dframe, aes(vectoraa, vectorbb), color = "yellow")
e

#red is India, blue is Canada
f<- ggplot() +
  geom_point(data=india_dframe, aes(vectora,vectorb), color = "red") +
  geom_point(data = can_dframe, aes(can_dframe$Year,can_dframe$YearAverage), color = "blue")
f

#linear regression, two continuous variables, insignificant p-values for both

#Indian Currency Rate vs Unemployment Rate
fit<- lm(vectorbb~india_dframe$YearAverage)
summary(fit)

#Canadian Currency Rate vs Unemployment Rate
fit2 <- lm(vectorbb~can_dframe$YearAverage)
summary(fit2)
