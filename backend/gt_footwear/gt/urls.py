from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='productlist'),
    path('order/create/', views.create_order, name='create_order'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/update/<int:pk>/', views.update_cart_item, name='update_cart_item'),
    path('cart/remove/<int:pk>/', views.remove_cart_item, name='remove_cart_item'),
    path('cart/clear/', views.clear_cart, name='clear_cart'),
    path('cart/total/', views.get_cart_total, name='get_cart_total'),
    path('cart/items/', views.get_cart_items, name='get_cart_items'),
]
