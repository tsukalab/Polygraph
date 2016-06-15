dat <- read.csv("Dummy.csv", header = F)
p <- ncol(dat)	

args1 = commandArgs(trailingOnly=TRUE)[1]
args2 = commandArgs(trailingOnly=TRUE)[2]
args3 = commandArgs(trailingOnly=TRUE)[3]
args4 = commandArgs(trailingOnly=TRUE)[4]
args5 = commandArgs(trailingOnly=TRUE)[5]
args6 = commandArgs(trailingOnly=TRUE)[6]
args7 = commandArgs(trailingOnly=TRUE)[7]
args8 = commandArgs(trailingOnly=TRUE)[8]
args9 = commandArgs(trailingOnly=TRUE)[9]
args10 = commandArgs(trailingOnly=TRUE)[10]

Args1 <- as.numeric(args1)
Args2 <- as.numeric(args2)
Args3 <- as.numeric(args3)
Args4 <- as.numeric(args4)
Args5 <- as.numeric(args5)
Args6 <- as.numeric(args6)
Args7 <- as.numeric(args7)
Args8 <- as.numeric(args8)
Args9 <- as.numeric(args9)
Args10 <- as.numeric(args10)

Sub1 <- Args1 - Args2
Sub2 <- Args2 - Args3
Sub3 <- Args3 - Args4
Sub4 <- Args4 - Args5
Sub5 <- Args5 - Args6
Sub6 <- Args6 - Args7
Sub7 <- Args7 - Args8
Sub8 <- Args8 - Args9
Sub9 <- Args9 - Args10

x <- c(Args1, Args2, Args3, Args4, Args5, Args6, Args7, Args8, Args9, Args10, Sub1, Sub2, Sub3, Sub4, Sub5, Sub6, Sub7, Sub8, Sub9)

y <- t(x)

library(kernlab)
res.svm <- ksvm(as.matrix(dat[,-p]),dat[,p],type="C-svc")
yhat <- predict(res.svm,as.matrix(y),type="response")
print(yhat)