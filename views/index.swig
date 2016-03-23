{% extends 'layout.swig' %}

{% block title %}Edit Themes{% endblock %}


{% block content %}

<div class="container themes-container">
	<div class="row">
	{% for t in themes %}
		<div class="sm-12 md-6 lg-6">					
			<div class="theme-entry">
				<a class="theme-link" href="/theme/{{ t }}">
					<div class="img-text-wrapper">
						<!--img class="img-responsive" src="data:image/jpeg;charset=utf-8;base64,{{ t.image_preview }}"-->
						
						<h3>{{ t }}</h3>
					</div>								
				</a>	
			</div>									
		</div>
	{% endfor %}			
	</div>
</div>

{% endblock %}

