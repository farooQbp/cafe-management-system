import matplotlib.pyplot as plt
import os

def calculate_and_plot_ingredient_consumption(orders, items, ingredients, inventory, output_dir='graphs2'):
    # print('inputs', orders, items, ingredients, inventory)
    plt.switch_backend('Agg')
    
    # Create a dictionary for quick lookup of item details by itemId
    item_dict = {str(item['_id']): item for item in items}

    # Create a dictionary for quick lookup of ingredients by ingredientId
    ingredient_dict = {str(ingredient['_id']): ingredient for ingredient in ingredients}

    # Create a dictionary for quick lookup of inventory by ingredient ID
    inventory_dict = {str(inv['ID']): inv for inv in inventory}

    # Step 3: Calculate Ingredients Consumption and Profits
    consumed_ingredients = {}
    consumed_ingredients_cost = {}
    item_quantities = {}
    date_prices = {}
    date_profits = {}

    for order in orders:
        total_cost = 0
        
        for order_detail in order['orderDetails']:
            item = order_detail['item'].capitalize()
            quantity = order_detail['quantity']
            if item in item_quantities:
                item_quantities[item] += quantity
            else:
                item_quantities[item] = quantity
                
            item_id = str(order_detail['itemId'])
            quantity_ordered = order_detail['quantity']

            if item_id in item_dict:
                item = item_dict[item_id]
                ingredient_id = str(item['INGREDIENTS'])

                if ingredient_id in ingredient_dict:
                    ingredients_used = ingredient_dict[ingredient_id]['ingredients']
                    print(item, ingredients_used)

                    for ingredient in ingredients_used:
                        ingredient_name = ingredient['ingredient']
                        quantity_used_per_item = ingredient['quantity']
                        total_quantity_used = quantity_used_per_item * quantity_ordered

                        if ingredient_name in consumed_ingredients:
                            consumed_ingredients[ingredient_name] += total_quantity_used
                        else:
                            consumed_ingredients[ingredient_name] = total_quantity_used

                        # Calculate cost of ingredients used
                        for inv_item in inventory:
                            if inv_item['NAME'] == ingredient_name:
                                if ingredient_name in consumed_ingredients_cost:
                                    consumed_ingredients_cost[order['_id']] = consumed_ingredients[ingredient_name] * inv_item['PRICE_PER_UNIT']
                                else:
                                    consumed_ingredients_cost[order['_id']] = 0

        # Aggregate date prices and profits
        order_date = order['orderDateandTime'].strftime("%d-%m-%Y")
        price = order['price']
        if order_date in date_prices:
            date_prices[order_date] += price
            # date_profits[order_date] += profit
        else:
            date_prices[order_date] = price
            # date_profits[order_date] = profit

    # Convert the results to an array of objects
    consumed_ingredients_list = [{'item': k, 'consumed': v} for k, v in consumed_ingredients.items()]

    # Step 4: Plot the Results
    ingredient_names = [item['item'] for item in consumed_ingredients_list]
    consumption_values = [item['consumed'] for item in consumed_ingredients_list]
    print(consumed_ingredients_cost)

    # Create directory for saving graphs
    os.makedirs(output_dir, exist_ok=True)
    
    plt.figure(figsize=(10, 5))
    plt.bar(ingredient_names, consumption_values, color='skyblue')
    plt.xlabel('Ingredients')
    plt.ylabel('Total Consumption Quantity (in grams or ml)')
    plt.title('Ingredient Consumption')
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'ingredient_consumption.png'))
    plt.close()
    
    # Plot Items vs Quantity
    plt.figure(figsize=(10, 5))
    plt.bar(item_quantities.keys(), item_quantities.values(), color='red')
    plt.xlabel('Items')
    plt.ylabel('Quantity')
    plt.title('Items vs Quantity')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'items_vs_quantity.png'))
    plt.close()

    # Plot Date vs Price
    plt.figure(figsize=(10, 5))
    plt.bar(date_prices.keys(), date_prices.values(), color='green')
    plt.xlabel('Date (DD-MM-YYYY)')
    plt.ylabel('Price')
    plt.title('Date vs Price')
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'date_vs_price.png'))
    plt.close()

    # Plot Date vs Profit
    plt.figure(figsize=(10, 5))
    plt.bar(date_prices.keys(), date_prices.values(), color='blue')
    plt.xlabel('Date (DD-MM-YYYY)')
    plt.ylabel('Profit')
    plt.title('Date vs Profit')
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'date_vs_profit.png'))
    plt.close()

    return {
        "consumption": consumed_ingredients_list,
        "ingredient_consumption": 'graphs/ingredient_consumption.png',
        'date_vs_price': 'graphs/date_vs_price.png',
        'items_vs_quantity': 'graphs/items_vs_quantity.png',
        'sale_profit': 'graphs/date_vs_profit.png',
    }
