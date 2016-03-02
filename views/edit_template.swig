{% extends 'layout.swig' %}

{% block title %}Edit File | {{ template[0].template_name }}{% endblock %}


{% block content %}

<div class="container-fluid">
	<div class="row">
		<div class="sm-12 md-8 lg-8">
			<div class="file-contents-wrapper">
				<div class="file-content">					
					<div id="editor">{{ template[0].content }}</div>
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

	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/html");

</script>
{% endblock %}