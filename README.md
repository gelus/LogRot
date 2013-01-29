 <h1>LogRot -- A Logo Rotator</h1>

LogRot is a simple logo rotator plug-in. Yes, I know I am reinventing the wheel but on first look I couldn't find a plug-in that did exactly what I wanted. That and I simply wanted to.

The Idea behind LogRot was to build a plug in that would:
<ol>
<li>Rotate seemlessly and endlessly</li>
<li>Respond to your mouse, slowing and speeding up as needed based on where your mouse was</li>
<li>Maintain a presentable shape when the browser resized</li>
</ol>

LogRot has a long way to go before I feel comfortable saying it is a full true-to-name plug-in but it is functional now.
<hr />
<h2>Use:</h2>
<h5>HTML:</h5>
LogRot uses two unordered lists that are wrapped in a div.<br />
<pre>
	
	<div id="Your-ID">
		<ul>
			<li>item</li>
			<li>item</li>
			<li>item</li>
		</ul>
		<ul>
			<li>item</li>
			<li>item</li>
			<li>item</li>
		</ul>
	</div>

</pre>
<h5>Call:</h5>
logrot.create("Your-ID", [{options:object}]);

logrot should be called from a window.onload event and the ID passed as the first parameter should be the id of the UL not the wrapping Div. (strange, yes I'll fix it latter.)
Currently the only option available is fade which accepts true of false and defaults to false. if true fade will look for img/slider-gradient-left.png and img/slider-gradient-right.png and apply them on the coinciding side.
Better support for this option and more options are yet to come.
