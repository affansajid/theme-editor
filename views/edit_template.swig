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

