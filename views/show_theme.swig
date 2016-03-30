{% extends 'layout.swig' %}


{% block content %}

<div class="container-fluid">
	<div class="row">
		<div class="sm-12 md-4 lg-4">
			<div class="files-list-wrapper">
				<div class="files-list">
					<h4>PAGE TYPES</h4>
					{% for t in templates.regular_files %}
					<div class="file-entry">
						<a class="file-link" href="/theme/{{ theme }}/home/{{ t }}">{{ t }}</a>
					</div>
					{% endfor %}	
					<h4>CSS/</h4>
					{% for t in templates.css_files %}
					<div class="file-entry">
						<a class="file-link" href="/theme/{{ theme }}/sass/{{ t }}">{{ t }}</a>
					</div>
					{% endfor %}
					<h4>JS/</h4>
					{% for t in templates.js_files %}
					<div class="file-entry">
						<a class="file-link" href="/theme/{{ theme }}/js/{{ t }}">{{ t }}</a>
					</div>
					{% endfor %}
					<h4>INCLUDES/</h4>
					{% for t in templates.includes %}
					<div class="file-entry">
						<a class="file-link" href="/theme/{{ theme }}/_includes/{{ t }}">{{ t }}</a>
					</div>
					{% endfor %}
					<h4>CUSTOM PAGES</h4>
					{% for t in templates.custom_pages %}
					<div class="file-entry">
						<a class="file-link" href="/theme/{{ theme }}/custom_pages/{{ t }}">{{ t }}</a>
					</div>
					{% endfor %}						
				</div>
			</div>
		</div>
		<div class="sm-12 md-8 lg-8">
			<div class="file-contents-wrapper">
				<div class="file-content">
					<code><pre></pre></code>
				</div>
			</div>
		</div>
	</div>
</div>

{% endblock %}

