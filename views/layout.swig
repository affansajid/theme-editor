<!doctype html>
<html lang="en">
<head>
  	<meta charset="utf-8">
	<!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
	<meta http-equiv="Content-type" content="text/html;charset=UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

	<title>{% block title %}Theme Editor{% endblock %}</title>
	{% block head %}
	<link rel="stylesheet" href="/css/style.css">
	<link href='https://fonts.googleapis.com/css?family=Montserrat|Roboto:400,400italic,500,700' rel='stylesheet' type='text/css'>
	{% endblock %}
</head>


<body>
	<header>
		<nav class="navigation">
			<ul>
				<li><a href="/">Themes</a></li>
			</ul>	
		</nav>
	</header>
  	{% block content %}{% endblock %}
</body>

{% block scripts %}
<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
{% endblock %}

{% if ENV_DEVELOPMENT %}
<script src="http://localhost:35729/livereload.js"></script>
{% endif %}

</html>
