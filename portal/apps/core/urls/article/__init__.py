# -*- coding: utf-8 -*-
from django.conf.urls.defaults import patterns, url
from django.views.generic import TemplateView

from core.views.article import article_detail, send_by_email


urlpatterns = patterns(
    '',
    url(r'^reportar/$', TemplateView.as_view(
        template_name='core/templates/article/reported.html'),
        name='article_report_sent'),
    url(r"^enviar/$", send_by_email, name="send_by_email"),
    url(r'^(?P<year>\d{4})/(?P<month>\d{1,2})/(?P<slug>[\w-]+)/$',
        article_detail, name='article_detail'),
)
