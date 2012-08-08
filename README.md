<h1>LogRot -- A Logo Rotator</h1>

LogRot is a simple logo rotator plugin. Yes, I know I am reinventing the wheel but on first look I couldn't find a plug-in that did exaclty what I wanted. That and I simply wanted to.

The Idea behind LogRot was to build a plug in that would:
<ol>
<li>Rotate seemlessly and endlessly</li>
<li>Respond to your mouse, slowing and speeding up as needed based on where your mouse was</li>
<li>Maintain a presentable shape when the browser resized</li>
</ol>

LogRot has a long way to go before I feel comfortable saying it is a full true-to-name plugin but it is functional now.

<h4>Use:</h4>
<h5>HTML:</h5>
LogRot uses an unordered list that is wrapped in a div.
<h5>Call:</h5>
new logrot("ID-Of-LI", {options:value});

logrot should be called from a window.onload event and the ID passed as the first parameter should be the id of the UL not the wrapping Div. (strange, yes I'll fix it latter.)
Curretly the only option available is fade which accepts true of false and defaults to false. if true fade will look for img/slider-gradient-left.png and img/slider-gradient-right.png and apply them on the coinciding side.
Better support for this option and more options are yet to come.
