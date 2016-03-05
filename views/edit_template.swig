{% extends 'layout.swig' %}


{% block content %}

<div class="secondary-nav">
	<nav class="navigation nav-btns">
		<h3 class="title">{{ template.template_name }}</h3>
		<button id="save-template" class="btn btn-success">Save Template</button>
		<p class="template-message"></p>
		<div class="clearfix"></div>
	</nav>
</div>
<div class="container-fluid">
	<div class="file-contents-wrapper">
		<div class="file-content">					
			<div id="editor">{{ template.content }}</div>
			<form id="editor-form">
				<textarea name="content"></textarea>
			</form>
		</div>
	</div>
</div>

{% endblock %}

{% block scripts %}
{% parent %}
<script type="text/javascript" src="/ace/ace.js"></script>
<script type="text/javascript" src="/ace/theme-monokai.js"></script>
<script type="text/javascript" src="/ace/mode-html.js"></script>
<script type="text/javascript" src="/ace/mode-css.js"></script>
<script type="text/javascript" src="/ace/mode-javascript.js"></script>
<script type="text/javascript" src="/ace/mode-json.js"></script>

<script type="text/javascript">

	// Ace Editor initialize
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/html");


	// Save the template in click
	$('#save-template').click(function() {
		$('#save-template').prop('disabled', true);

		$('[name="content"]').val(editor.getValue());

	    $.ajax({
	        url: '/theme/{{ template.theme_asset_id }}/template/{{ template.id }}',
	        type: 'post',
	        dataType: 'json',
	        data: $('#editor-form').serialize(),
	        success: function(data) {
	            $('#save-template').prop('disabled', false);
	            $('.template-message').html('Saved Successfully...').show().fadeOut(5000);	            
	        },
	        error: function(data) {
	        	$('#save-template').prop('disabled', false);
	        	$('.template-message').html('Did Not Save').show().fadeOut(5000);
	        }	
		});
	});	
</script>
{% endblock %}