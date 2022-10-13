# GIT关联仓库及跟踪远程分支流程



### 在远程仓库创建一个名字为abc的分支,并提交一个文件

###### 本地创建一个文件夹

git init 初始化本地仓库

git checkout -b abc 创建本地abc分支并进入该本地分支

git remote 跟踪远程仓库

git push --set-upstream origin abc 在远程仓库创建一个abc分支并关联该分支

创建一个文件

git add . 

git commit -m "第一个文件"

git push 推送第一个文件到远程仓库的dev分支



## 解决一个在线项目bug

git clone url  拉取远程仓库代码 (这时候本地仓库已经跟踪了远程仓库并且关联了master分支,git push 可直接往master分支推送)

git checkout -b dev 在本地仓库创建一个名为dev的分支并进入该本地分支

git --set-upstream orgin dev  在远程仓库创建一个名为dev的分支并关联该分支

解决bug

git add.

git commit -m "bug已修复"

git push 推送修改后的代码到远程仓库名为dev的分支上

等待远程仓库master分支使用git merge合并dev分支解决bug



如果你想在本地abc分支下关联远程def分支

git branch --set-upstream-to=远程分支名 本地分支名