# Git

#### 本地搭建仓库

git init 创建一个空.git目录

git clone [url]  克隆远程目录,从远程服务器镜像一份至本地

#### 基本文件操作

##### 文件的四种状态:

Untracked未跟踪    Unmodify已入库未修改    Modified文件已修改     Staged暂存状态

git status 查看文件状态

git add .  将文件提交到暂存区

git commit -m "备注"   将暂存区文件提交到本地仓库 -m为提交信息

##### 忽略文件:  

.gitignore  忽略的文件类型以*开头  名称前有!代表例外规则,不被忽略

举例 文件里面写*.rar不配置rar文件    *.mp4不配置mp4文件

设置本机绑定SSH公钥,实现远程仓库免密码登录

ssh-keygen 或者ssh-keyfen -t rsa 生成加密公钥 

git push 从本地仓库提交到远程仓库 或者git push 分支

##### 分支:

git branch 列出所有本地分支

git branch --r 列出所有远程分支

git branch [branch-name] 新建一个分支,但依然停留在当前分支

gir checkout -b [branch] 新建一个分支,并切换到该分支

git merge [branch] 和并指定分支到当前分支

git branch -d [branch-name] 删除分支

删除远程分支

1.git push origin --delete [branch-name]

2.git branch -dr [remote/branch]git



##### 跟踪远程仓库 (关联远程仓库后方可操作远程分支)

git remote add origin url



##### 创建远程分支

1、git branch -rv 查看所有远程分支

2、git checkout -b + 分支名  创建分支

3、git push --set-upstream origin + 刚刚创建的分支名(在刚在创建的本地分支使用此命令) 远程分支创建成功

或者 git push orgin 本地分支名:远程分支名



##### 关联远程分支

git branch --set-upstream-to=远程分支 本地分支

把远程分支和本地分支填写到对应的地方即可.

注意:远程分支要带上仓库名 比如 origin/xxx_分支名 



##### 版本回滚

git reset --hard [记录哈希] 



##### git从暂存区撤回修改

```shell
# 恢复暂存区的指定文件到工作区
git checkout [file]
# 恢复暂存区的所有文件到工作区
git checkout .
```

##### git查看配置

```shell
git config -l
```

##### git初始化ssh

```shell
ssh-keygen -t rsa -C "邮箱"
```

##### git 配置用户名和邮箱

```shell
git config --global user.name "用户名"
git config --global user.email "邮箱"
```

##### git查看分支

```shell
git branch -v
# 查看远程分支
git branch -a  
```