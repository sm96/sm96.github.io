getwd()
setwd('/Users/Sanchya/Documents/INFO370/a2-data-wrangling-sm96/')


source('Functions.R')
library(ggplot2)

#Calculating metrics for each city

filenames <- list.files('./data/prepped', full = TRUE)  
data <- lapply(filenames, read.csv, header = TRUE)

names <- gsub("_race.csv", '', basename(filenames))
dissimilarity <- lapply(data, calcDissimilarity)
interaction <-  lapply(data, calcInteraction)
isolation <- lapply(data, calcIsolation)
correlation <- lapply(data, calcCorrelation)


# Building a dataframe

dframe <- data.frame("City Name" = names,'Dissimilarity' = unlist(dissimilarity), 'Interaction' = unlist(interaction), 'Isolation' = unlist(isolation), 'Correlation' = unlist(correlation))
#analysis

#dissimilarity min and max
min_dissimilarity <- min(dframe$Dissimilarity)
mindiscity <- dframe[which.min(dframe$Dissimilarity), ]
showmindis <- mindiscity$City.Name

max_dissimilarity <- max(dframe$Dissimilarity)
maxdiscity <- dframe[which.max(dframe$Dissimilarity), ]
showmaxdis <- maxdiscity$City.Name

#interaction min and max
min_interaction <- min(dframe$Interaction)
minintcity <- dframe[which.min(dframe$Interaction), ]
showminint <- minintcity$City.Name

max_interaction <- max(dframe$Interaction)
maxintcity <- dframe[which.max(dframe$Interaction), ]
showmaxint <- maxintcity$City.Name

#isolation min and max
min_isolation <- min(dframe$Isolation)
minisocity <- dframe[which.min(dframe$Isolation), ]
showminiso <- minisocity$City.Name

max_isolation <- max(dframe$Isolation)
maxisocity <- dframe[which.max(dframe$Isolation), ]
showmaxiso <- maxisocity$City.Name

#correlation min and max
min_correlation <- min(dframe$Correlation)
mincorrcity <- dframe[which.min(dframe$Correlation), ]
showmincorr <- mincorrcity$City.Name

max_correlation <- max(dframe$Correlation)
maxcorrcity <- dframe[which.max(dframe$Correlation), ]
showmaxcorr <- maxcorrcity$City.Name

#averages for all
avg_dissimilarity <- mean(dframe$Dissimilarity)
avg_interaction <- mean(dframe$Interaction)
avg_isolation <- mean(dframe$Isolation)
avg_correlation <- mean(dframe$Correlation)

mins <- c(min_dissimilarity, min_interaction, min_isolation, min_correlation)
min_cities <-c(names[showmindis], names[showminint], names[showminiso], names[showmincorr])
maxs <- c(max_dissimilarity, max_interaction, max_isolation, max_correlation)
max_cities <- c(names[showmaxdis], names[showmaxint], names[showmaxiso], names[showmaxcorr])
avgs <- c(avg_dissimilarity, avg_interaction, avg_isolation, avg_correlation)

metric_name <- c("Dissimilarity", "Interaction", "Isolation", "Correlation")
new_data <- data.frame(metric_name, 'Minimum' = mins, 'Maximum' = maxs, 'Average' = avgs, "Min City" = min_cities, "Max City" = max_cities)

#visualizations

#Dissimilarity vs.Interaction
dissim <- dframe$Dissimilarity
interact <- dframe$Interaction
plot(dissim, interact, xlab = "Dissimilarity Index", ylab = "Interaction Index")
abline(lm(interact ~ dissim))
qplot(dissim, interact, data = dframe, colour = names)

#Dissimilarity vs Correlation
corr <- dframe$Correlation
plot(dissim, corr, xlab = "Dissimilarity Index", ylab = "Correlation Index")
abline(lm(corr ~ dissim))
qplot(dissim, corr, data = dframe, colour = names)

#Interaaction vs Correlation
plot(interact, corr, xlab = "Interaction Index", ylab = "Correlation Index")
abline(lm(corr ~ interact))
qplot(interact, corr, data = dframe, colour = names)

#boxplots
boxplot(dissim)
boxplot(interact)
boxplot(corr)

#My own metric section
new_metric <- lapply(data, calcNewMetric)
metric_df <- data.frame("City Name" = names, 'New Metric' = unlist(new_metric))
boxplot(new_metric)