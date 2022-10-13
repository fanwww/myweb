# input 表单中的 number 数字居中

在html数字输入中居中文本(Center text in html number input)

我有一个在html中的数字输入。 我想中心文本(即输入)在里面。 我当然做到了：

text-align: center;

哪种作品。 但问题是。 当显示这些箭头时，文本现在居中。 但是当箭头消失时，文本停留在现在不再是中心的相同位置。

![0591f5a4f09d5bdb0a66d89e2b0bfc60.png](https://img-blog.csdnimg.cn/img_convert/0591f5a4f09d5bdb0a66d89e2b0bfc60.png)

I have a number input in html. I want to center the text (i.e. the input) that is inside. I of course did:

text-align: center;

which sort of works. The problem is though. The text is now centered when those arrows are shown. But when the arrows disappear, the text stays at the same position which now of course isn't the center anymore.

![0591f5a4f09d5bdb0a66d89e2b0bfc60.png](https://img-blog.csdnimg.cn/img_convert/0591f5a4f09d5bdb0a66d89e2b0bfc60.png)

原文：https://stackoverflow.com/questions/23715881

2019-11-29 10:49

满意答案

您可以让微调按钮(箭头)始终显示：

input[type='number']::-webkit-inner-spin-button,

input[type='number']::-webkit-outer-spin-button {

opacity: 1;

}

或者你可以让他们始终隐藏：

input[type='number']::-webkit-inner-spin-button,

input[type='number']::-webkit-outer-spin-button {

-webkit-appearance: none;

margin: 0;

}

无论哪种选择，内容将始终居中。

You can have the spinner buttons (arrows) always show:

input[type='number']::-webkit-inner-spin-button,

input[type='number']::-webkit-outer-spin-button {

opacity: 1;

}

Or you can have them always hidden:

input[type='number']::-webkit-inner-spin-button,

input[type='number']::-webkit-outer-spin-button {

-webkit-appearance: none;

margin: 0;

}

With either option, the contents will always be centred.

相关问答

要将输入值的更改反映到HTML，您必须设置输入的value属性。 像这样的东西： $('#test').change(function () {

$(this).attr('value', this.value);

});

另请注意，jQuery .html()返回html的innerHTML ，因此您必须修改您的字符串以开始和结束html标记(或使用vanilla JS outerHTML )。 jsFiddle的现场演示 。 To reflect the changes to inp...

如果您只想更改占位符风格 ::-webkit-input-placeholder {

text-align: center;

}

:-moz-placeholder { /* Firefox 18- */

text-align: center;

}

::-moz-placeholder { /* Firefox 19+ */

text-align: center;

}

:-ms-input-placeholder {

text-align: center...

JavaScript (最可靠的)

虽然这很简单，它不会让您使用组合键和其他不可键入的键。 对于更完整的JavaScript解决方案，也支持输入类型号和最大长度验证，请考虑使用此Polyfill 。 HTML 5 (不需要JavaScript，并且在许多现代浏览器中也不会以标准方式运行。)

您可以让微调按钮(箭头)始终显示： input[type='number']::-webkit-inner-spin-button,

input[type='number']::-webkit-outer-spin-button {

opacity: 1;

}

或者你可以让他们始终隐藏： input[type='number']::-webkit-inner-spin-button,

input[type='number']::-webkit-outer-spin-button {...

你可以通过这种方式实现这一点。

var input = document.getElementById("Parti_NEstudante");

input.addEventListener("input", function() {

if (this.value.length > this.max.leng...

我看到了你的代码并在我的本地服务器上进行了测试。 您的输入标记中的name属性似乎是大写字母N(firstName)。 $ _POST＆$ _GET区分大小写。 并且，尝试在您编码的每个php上使用此功能，以便您可以监视您正在接收的内容。 function pr($var) {

echo '

```
';
```

print_r($var);

echo '

';

}

例如： pr($_POST);

pr($_GET);

pr($_REQUEST);

祝你好运！ I...

innerHTML设置元素内的文本(包括html元素)。 通常，我们将它用于div，span等元素以在其中插入其他html元素。 对于你的情况，你想设置一个输入元素的值。 所以你应该使用value属性。 将innerHTML更改为value document.getElementById('add').value = sum;

innerHTML sets the text (including html elements) inside an element. Normally we use ...

根据HTML5定义，没有指定数字格式的选项。 现在最新的浏览器不会将输入的数字视为相同(请参阅https://caniuse.com/#feat=input-number中的 “已知问题”)。 我担心在输入中强制给定模式的唯一选择涉及JavaScript。 来源： https ： //developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number，https : //www.w3.org/TR/html5/sec-forms.html#...

你试过什么了？ 你几乎回答了自己的问题，让输入具有透明的背景。 input {

border: 0;

outline: 0;

background: transparent;

border-bottom: 2px solid black;

width: 20px;

}

的jsfiddle What have you tried so far? You pretty much answered your own question, make the inpu...

我也尝试将顶部和底部填充设置为13px，将高度设置为14px(结合字体大小)将导致元素高40px。 这按预期工作; 除了任何带尾巴的字符(如g，q，j等)在底部被截断。 如何将顶部填充设置为13px(而不是底部填充)并将高度设置为剩余空间，如下所示： 它在Firefox和Chrome中都能正常运行; 我目前还没有访...

相关文章

Java Number类 一般地，当需要使用数字的时候，我们通常使用内置数据类型，如：byte、

...

写like语句的时候 一般都会写成 like '% %' 在mybatis里面写就是应该是

...

各位大虾晚上好，我有个问题想请教你们，我想美化html的file外观，但貌似现在还不能用css直接设计

...

Structure in the flow » Blog Archive »

...

一、中文分词：分词就是利用计算机识别出文本中词汇的过程。 1.典型应用：汉字处理：拼音输入法、手写识别

...

lucene对索引的更新比solr麻烦，solr只需要调用一个函数UpdateRequest.setA

...

内容摘要:HTML5 智能form表单新属性，主要包括智能表单介绍和智能表单使用与规范。但在不同支持H

...

判断第二个日期比第一个日期大,用table显示n条记录，每3行换一次颜色，即1，2，3用红色字体，4，

...

HTML5有两个很炫的元素，就是Audio和Video,可以用他们在页面上创建音频播放器和视频播放器，

...

最新问答

List lc = driver.findElements(By.cssSelector("table[id*='filter']")); for (WebElement row : lc) { List images = row.findElements(By.tagName("img")); for (WebElement image : images) { image.click(); } } List

我没有任何问题，但我能够通过启用我的弹出窗口拦截器(我使用更好的弹出窗口阻止程序 - Chrome网上应用店 )来重现你在运行Chrome 21.0.1180.89的Windows 7上遇到的问题。 如果您使用弹出窗口阻止程序，请尝试为jsfiddle /您正在使用的站点禁用它。 I didn't have any issues with it, but I was able to reproduce the problem you were having on Windows 7 runnin

opencv已经有开源的人脸识别的代码了，只需要安装一下，有训练好的关于人脸的xml文件，然后根据这两个xml文件，输入一张带有人脸的图片进行检测就好了。参考网址：http://www.cnblogs.com/mengdd/archive/2012/08/01/2619043.html 这里说的更详细一些。matlab是专门针对图像处理的，不过一般的用matlab实现的，用opencv也都可以做的到。有些时候将matlab代码转为opencv还是需要一定时间和一定功底的

您需要使用ProximitySensor来检测手机屏幕何时被覆盖。 这是一个例子： 在android中使用接近传感器 You need to use ProximitySensor to detect when the phone screen is covered. Here is an example: Using proximity sensor in android

我认为找到这个的最简单方法是搜索ProjectName列。 它似乎包含层次结构信息： select c.* from content c where ProjectName+' ' like '%Project 1 %' 额外的空间是确保Project 1与Project 10不匹配。 I found the way to solve. But the actual solution is given by Jayvee. Sorry I didnt know the method it ca

弄清楚了！ 它被链接到： searchText: 'Search for a member...', 这将自动填充搜索栏的内容，并尝试根据该搜索词找到用户。 删除此属性解决了这个问题。 Figured it out! It was linked to: searchText: 'Search for a member...', This will autofill the search bar with content and will attempt to find the user

错误2245也可能是密码历史记录问题。 新密码是最近使用的密码吗？ 编辑：看起来这个功能在Server 2003 SP 2之后破了。我在使用文档中的示例从C ++调用函数时遇到了同样的错误。 您可能需要使用NetUserSetInfo。 Error 2245 could also be a password history problem. Is the new password one that was used in the recent past? Edit: It looks like

我在网上搜索了很多，为我的问题找到答案。 我花了很多时间，所以我在这里贴出来帮助别人。 为了使GLEW与MinGW一起工作，您应该从GLEW网站下载源代码并放置 来自MinGW \ bin的gcc.exe 来自MinGW32 \ mingw32 \ bin的ar.exe 到GLEWs源文件夹并在该文件夹中创建并运行.bat，如下所示： gcc -DGLEW_NO_GLU -O2 -Wall -W -Iinclude -DGLEW_BUILD -o src/glew.o -c src/glew.

使用模板成员函数时，您需要使用template关键字，如下所示： my_postoffice.template get_postbox() 和 po.template get_postbox() cf here： http ： //ideone.com/W0owY1代码和这里： 我在哪里以及为什么要放置“template”和“typename”关键字？ 有关何时使用模板关键字的确切说明 You need to use the template keyword when using

你不能，至少在Devel :: REPL调用Data :: Dump :: Streamer的情况下。 DDS将始终编码不在\ x20- \ x7e范围内的任何字符。 您可以修改DDS以选择其他方式。 After reading the source of DDS, I came up with this patch based on the Perl Monks code: $ cat quote.rc { no warnings 'redefine'; sub Data::D