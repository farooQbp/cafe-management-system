import matplotlib.pyplot as plt
import os

def calculate_and_plot_ingredient_consumption(orders, items, ingredients, output_dir='graphs'):
    plt.switch_backend('Agg')
    # Create a dictionary for quick lookup of item details by itemId
    item_dict = {str(item['_id']): item for item in items}

    # Create a dictionary for quick lookup of ingredients by ingredientId
    ingredient_dict = {str(ingredient['_id']): ingredient for ingredient in ingredients}

    # Step 3: Calculate Ingredients Consumption
    consumed_ingredients = {}

    for order in orders:
        for order_detail in order['orderDetails']:
            item_id = str(order_detail['itemId'])
            quantity_ordered = order_detail['quantity']

            if item_id in item_dict:
                item = item_dict[item_id]
                ingredient_id = str(item['INGREDIENTS'])

                if ingredient_id in ingredient_dict:
                    ingredients_used = ingredient_dict[ingredient_id]['ingredients']

                    for ingredient in ingredients_used:
                        ingredient_name = ingredient['ingredient']
                        quantity_used_per_item = ingredient['quantity']
                        total_quantity_used = quantity_used_per_item * quantity_ordered

                        if ingredient_name in consumed_ingredients:
                            consumed_ingredients[ingredient_name] += total_quantity_used
                        else:
                            consumed_ingredients[ingredient_name] = total_quantity_used

    # Convert the results to an array of objects
    consumed_ingredients_list = [{'item': k, 'consumed': v} for k, v in consumed_ingredients.items()]

    # Step 4: Plot the Results
    ingredient_names = [item['item'] for item in consumed_ingredients_list]
    consumption_values = [item['consumed'] for item in consumed_ingredients_list]

    plt.figure(figsize=(10, 5))
    plt.bar(ingredient_names, consumption_values, color='skyblue')
    plt.xlabel('Ingredients')
    plt.ylabel('Total Consumption Quantity (in grams or ml)')
    plt.title('Ingredient Consumption')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'ingredient_consumption.png'))
    plt.close()

    return { "consumption": consumed_ingredients_list, "graph": "graphs/ingredient_consumption.png"}