{% extends 'layout.swig' %}

{% block title %}Edit File | {{ template[0].template_name }}{% endblock %}


{% block content %}

<div>
	<nav class="navigation">
		<ul>
			<li><div id="save-template" class="btn btn-success">Save</div></li>
		</ul>	
	</nav>
</div>
<div class="container-fluid">
	<div class="row">
		<div class="sm-12 md-8 lg-8">
			<div class="file-contents-wrapper">
				<div class="file-content">					
					<div id="editor">{{ template[0].content }}</div>
					<form id="editor-form">
						<textarea name="content"></textarea>
					</form>
				</div>
			</div>
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

		$('[name="content"]').val(editor.getValue());

	    $.ajax({
	        url: '/theme/{{ template[0].theme_asset_id }}/template/{{ template[0].id }}',
	        type: 'post',
	        dataType: 'json',
	        data: $('#editor-form').serialize(),
	        success: function(data) {
	            console.log(data.message);
	        },
	        error: function(data) {
	            console.log(data.message);
	        }	
		});
	});	
</script>
{% endblock %}