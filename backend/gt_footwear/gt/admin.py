from django.contrib import admin
from .models import Brand, Category, Product, Size, Order, Review, Cart, OrderItem

admin.site.register(Brand)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Size)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(Cart)
