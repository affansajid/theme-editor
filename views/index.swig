{% extends 'layout.swig' %}

{% block title %}Edit Themes{% endblock %}


{% block content %}

<div class="container-fluid">
	<div class="row">
		<div class="small-12 medium-4 large-4">
			<div class="files-list-wrapper">
				<div class="files-list">
					{% for t in templates %}
					<div class="file-entry">
						<a class="file-link" href="/template/{{ t.id }}/edit">{{ t.template_name }}</a>
					</div>
					{% endfor %}					
				</div>
			</div>
		</div>
		<div class="small-12 medium-8 large-8">
			<div class="file-contents-wrapper">
				<div class="file-content">
					<code><pre>{{ templates[0].content }}</pre></code>
				</div>
			</div>
		</div>
	</div>
</div>

{% endblock %}

