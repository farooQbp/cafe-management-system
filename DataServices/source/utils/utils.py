def stock_updation(ingredients, inventory, order_quantity):
  # Loop through each ingredient in the recipe
  for ingredient in ingredients:
    ingredient_name = ingredient["ingredient"]
    ingredient_quantity = ingredient["quantity"] * order_quantity

    # Find the corresponding ingredient in the inventory
    for item in inventory:
      if item["NAME"] == ingredient_name:
        # Reduce stock from inventory (ignoring availability)
        item["STOCK_AVAILABLE"] -= ingredient_quantity
        break
  return inventory