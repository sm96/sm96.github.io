#Formula #1
## ---- Dissimilarity
calcDissimilarity <- function(df){
  xi = subset.data.frame(df, select = c("pop.not.white"))
  ti = subset.data.frame(df, select = c("pop"))
  pi = xi/ti
  X = sum(xi)
  Ttot = sum(ti)
  P = X/Ttot
  index = (sum((ti)*(abs(pi-P))))/(2*Ttot*P*(1-P))
  return(index)
}
## ---- end-of-Dissimilarity

#Formula #5

calcInteraction <- function(df){
  xi = subset.data.frame(df, select = c("pop.not.white"))
  ti = subset.data.frame(df, select = c("pop"))
  yi = subset.data.frame(df, select = c("pop.white"))
  X = sum(xi)
  index = sum((xi/X)*(yi/ti))
  return(index)
}


#Formula #6

calcIsolation <- function(df){
  xi = subset.data.frame(df, select = c("pop.not.white"))
  ti = subset.data.frame(df, select = c("pop"))
  yi = subset.data.frame(df, select = c("pop.white"))
  X = sum(xi)
  index = sum((xi/X)*(xi/ti))
  return(index)
}

#Formula #7
calcCorrelation <- function(df){
  xi = subset.data.frame(df, select = c("pop.not.white"))
  ti = subset.data.frame(df, select = c("pop"))
  pi = xi/ti
  X = sum(xi)
  Ttot = sum(ti)
  P = X/Ttot
  index = (calcIsolation(df) - P)/(1 - P)
  return(index)
}

#NewMetric
calcNewMetric <-function(df){
 index = (((calcIsolation(df))/calcInteraction(df)))-(calcCorrelation(df))
 return(index)
}
